package moteoversiktfssfront;

import no.nav.brukerdialog.security.context.CustomizableSubjectHandler;
import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static java.lang.System.setProperty;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {
    private static final int PORT = 8290;

    public static void main(String[] args) throws Exception {
        setProperty("no.nav.brukerdialog.security.context.subjectHandlerImplementationClass", CustomizableSubjectHandler.class.getName());

        Jetty jetty = usingWar()
                .at("/moteoversikt")
                .overrideWebXml()
                .loadProperties("/test.properties")
                .port(PORT)
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
