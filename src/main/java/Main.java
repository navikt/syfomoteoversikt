
import ch.qos.logback.classic.Level;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import java.io.File;

import static java.lang.System.*;
import static java.util.Arrays.*;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.first;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.gotKeypress;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.waitFor;
import static no.nav.sbl.util.LogUtils.setGlobalLogLevel;

public class Main {
    public static void main(String... args) throws Exception {
        getenv().forEach(System::setProperty);
        setProperty("OIDC_REDIRECT_URL", getProperty("VEILARBLOGIN_REDIRECT_URL_URL"));
        setGlobalLogLevel(Level.INFO);
        Jetty jetty = Jetty.usingWar(new File("/app"))
                .at("/moteoversikt")
                .port(8080)
                .configureForJaspic(asList("/internal/*"))
                .disableAnnotationScanning()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}