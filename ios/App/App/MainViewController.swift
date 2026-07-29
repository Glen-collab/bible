import UIKit
import Capacitor

/// Capacitor 6 dropped the Objective-C runtime scan for plugins — it registers
/// only what is in the generated `packageClassList`, which covers npm plugins
/// but NOT plugins that live in the app target. So FootstepsPrintPlugin has to
/// be registered by hand here, and `registerPluginInstance` is the call that
/// works: `registerPluginType` silently does nothing while autoRegisterPlugins
/// is on. If printing ever goes quiet again, check this first.
class MainViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(FootstepsPrintPlugin())
    }
}
