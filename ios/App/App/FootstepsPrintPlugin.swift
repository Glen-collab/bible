import Foundation
import Capacitor
import UIKit

/// Sends the coloring page to AirPrint.
///
/// The web app renders the page to a PNG data URL and calls this; WKWebView has
/// no `window.print()` (it is a silent no-op), so the browser path cannot work
/// inside the app. Deliberately print-only — no share sheet — so the app needs
/// no photo-library or file permissions.
@objc(FootstepsPrintPlugin)
public class FootstepsPrintPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "FootstepsPrintPlugin"
    public let jsName = "FootstepsPrint"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "printImage", returnType: CAPPluginReturnPromise)
    ]

    @objc func printImage(_ call: CAPPluginCall) {
        guard let dataUrl = call.getString("data") else {
            call.reject("no image data")
            return
        }

        // accept either a bare base64 string or a full "data:image/png;base64,…" URL
        let base64: String
        if let comma = dataUrl.firstIndex(of: ",") {
            base64 = String(dataUrl[dataUrl.index(after: comma)...])
        } else {
            base64 = dataUrl
        }

        guard let data = Data(base64Encoded: base64),
              let image = UIImage(data: data) else {
            call.reject("could not decode the page image")
            return
        }

        DispatchQueue.main.async {
            guard UIPrintInteractionController.isPrintingAvailable else {
                call.reject("printing is not available on this device")
                return
            }

            let info = UIPrintInfo(dictionary: nil)
            info.outputType = .general
            info.jobName = "Footsteps Coloring Page"
            info.orientation = image.size.width > image.size.height ? .landscape : .portrait

            let controller = UIPrintInteractionController.shared
            controller.printInfo = info
            controller.printingItem = image
            controller.showsNumberOfCopies = true

            controller.present(animated: true) { _, completed, error in
                if let error = error {
                    call.reject(error.localizedDescription)
                } else {
                    // completed == false simply means the child closed the dialog
                    call.resolve(["completed": completed])
                }
            }
        }
    }
}
