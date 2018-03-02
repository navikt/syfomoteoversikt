package no.nav.sbl.moteoversiktfssfront.selftest;

import no.nav.sbl.dialogarena.common.web.selftest.SelfTestBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;

import static java.lang.System.getProperty;
import static java.net.HttpURLConnection.HTTP_OK;
import static java.util.Arrays.asList;
import static no.nav.sbl.dialogarena.types.Pingable.Ping.feilet;
import static no.nav.sbl.dialogarena.types.Pingable.Ping.lyktes;

public class SelftestServlet extends SelfTestBaseServlet{
    private static final String APPLIKASJONS_NAVN = "Moteoversiktfront";

    @Override
    protected String getApplicationName() {
        return APPLIKASJONS_NAVN;
    }

    @Override
    protected Collection<? extends Pingable> getPingables() {
        return asList(
        );
    }

    private Pingable pingUrl(final String name, final String url) {
        Pingable.Ping.PingMetadata pingMetadata = new Pingable.Ping.PingMetadata(url, name, true);
        return () -> {
            HttpURLConnection connection;
            try {
                connection = (HttpURLConnection) new URL(url).openConnection();
                connection.setConnectTimeout(10000);
                if (connection.getResponseCode() == HTTP_OK) {
                    return lyktes(pingMetadata);
                } else {
                    return feilet(pingMetadata, new RuntimeException(connection.getResponseCode() + " " + connection.getResponseMessage()));
                }
            } catch (Exception e) {
                return feilet(pingMetadata, e);
            }
        };
    }
}
