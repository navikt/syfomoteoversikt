package moteoversiktfssfront;

import no.nav.innholdshenter.common.EnonicContentRetriever;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.lang.System.getProperty;
import static java.util.Arrays.asList;

public class Dekorator extends DecoratorFilter {
    private static final String FRAGMENTS_URL = "/internarbeidsflatedecorator/index.html";
    private static final String APPLICATION_NAME = "Møteoversikt";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList(".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES = new ArrayList<>(asList("header-withmenu", "styles"));

    public Dekorator() {
        super();
        setFragmentsUrl(FRAGMENTS_URL);
        setContentRetriever(setUpContentRetriever());
        setApplicationName(APPLICATION_NAME);
        setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        setFragmentNames(FRAGMENT_NAMES);
    }

    private EnonicContentRetriever setUpContentRetriever() {
        EnonicContentRetriever contentRetriever = new EnonicContentRetriever();
        contentRetriever.setBaseUrl(getProperty("modapp.url"));
        contentRetriever.setRefreshIntervalSeconds(1800);
        return contentRetriever;
    }
}
