package moteoversiktfssfront;

import no.nav.brukerdialog.security.context.InternbrukerSubjectHandler;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.apache.geronimo.components.jaspi.AuthConfigFactoryImpl;

import javax.security.auth.message.config.AuthConfigFactory;
import java.security.Security;

import static java.lang.System.setProperty;
import static no.nav.brukerdialog.security.context.InternbrukerSubjectHandler.setServicebruker;
import static no.nav.brukerdialog.security.context.InternbrukerSubjectHandler.setVeilederIdent;
import static no.nav.modig.lang.collections.FactoryUtils.gotKeypress;
import static no.nav.modig.lang.collections.RunnableUtils.first;
import static no.nav.modig.lang.collections.RunnableUtils.waitFor;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

public class StartJetty {
    private static final int PORT = 8290;

    public static void main(String[] args) throws Exception {
        Security.setProperty(AuthConfigFactory.DEFAULT_FACTORY_SECURITY_PROPERTY, AuthConfigFactoryImpl.class.getCanonicalName());
        setVeilederIdent("Z990572");
        setServicebruker("srvmoteoversiktfront");
        setProperty("no.nav.modig.core.context.subjectHandlerImplementationClass", InternbrukerSubjectHandler.class.getName());
        Jetty jetty = usingWar()
                .at("/moteoversikt")
                .overrideWebXml()
                .loadProperties("/test.properties")
                .port(PORT)
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}
