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

import org.json.JSONException;
import org.json.JSONObject;

import pt.saclient.business.GlobalVariables;

/**
 * Servlet implementation class SetVote
 */
@WebServlet(description = "Set Vote", urlPatterns = { "/setvote" })
public class SetVote extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SetVote() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String uid = request.getParameter("usr_id");
		String cid = request.getParameter("usr_cid");
		
		URL url = new URL("http://" + GlobalVariables.HOST + "/SARestFul_1.0.0/1.0/services/servidorjaxrs/services/vote?uid=" + uid + "&cid=" + cid);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("POST");
		con.setRequestProperty("Accept", "application/json");
		
		// Erro de conexao
		if (con.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + con.getResponseCode());
		}
		
		InputStream stream = con.getInputStream();
		String data = GlobalVariables.convertStreamToString(stream);
		
		response.getWriter().write(data);
	}

}
