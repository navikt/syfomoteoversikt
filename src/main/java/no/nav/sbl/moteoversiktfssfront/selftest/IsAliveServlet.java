package no.nav.sbl.moteoversiktfssfront.selftest;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class IsAliveServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().write("{status : \"ok\", message: \"Moteoversiktfssfront fungerer\"}");
    }
}
