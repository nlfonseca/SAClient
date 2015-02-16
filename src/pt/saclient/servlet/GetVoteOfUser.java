package pt.saclient.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import pt.saclient.business.GlobalVariables;

/**
 * Servlet implementation class GetVoteOfUser
 */
@WebServlet(description = "Get Vote Of User", urlPatterns = { "/getvoteofuser" })
public class GetVoteOfUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetVoteOfUser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		int uid = (Integer) session.getAttribute("usr_id");
		
		URL url = new URL("http://" + GlobalVariables.HOST + "/SARestFul_1.0.0/1.0/services/servidorjaxrs/services/voteuser?uid=" + uid);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("Accept", "application/json");
		
		// Erro de conexao
		if (con.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + con.getResponseCode());
		}
		
		InputStream stream = con.getInputStream();
		String data = GlobalVariables.convertStreamToString(stream);
		
		response.setContentType("application/json");
		response.getWriter().write(data.toString());
	}

}
