package moteoversiktfssfront;


import no.nav.brukerdialog.isso.RelyingPartyCallback;
import org.glassfish.jersey.server.ResourceConfig;

public class RestConfig extends ResourceConfig {

    public RestConfig() {
        super(RelyingPartyCallback.class);
    }

}
