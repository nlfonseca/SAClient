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
import pt.saclient.business.User;

/**
 * Servlet implementation class GetCandidates
 */
@WebServlet(description = "Get Candidates", urlPatterns = { "/getcandidates" })
public class GetCandidates extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetCandidates() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		URL url = new URL("http://" + GlobalVariables.HOST + "/SARestFul_1.0.0/1.0/services/servidorjaxrs/services/candidates/");
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		con.setRequestProperty("Accept", "application/json");
		
		// Erro de conexao
		if (con.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + con.getResponseCode());
		}
		
		InputStream stream = con.getInputStream();
		String data = GlobalVariables.convertStreamToString(stream);
		
		// JSON Object
		JSONObject json;
		
		try {
			json = new JSONObject(data);
			
			// ha dados
			if (!json.toString().equals("{}")) {
				
				JSONObject candidatesJSON = json.getJSONObject("Candidates");
				
				response.setContentType("application/json");
				response.getWriter().write(candidatesJSON.toString());
			}
			
		} catch (JSONException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
	}

}
