package de.eliyo.controller;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean
@ApplicationScoped
public class DatabaseController {

	private Connection con;
	private static final Logger logger = Logger.getLogger( DatabaseController.class.getName() );

	public boolean insert(String email, String search, String website) {
		try {
			if (con == null)
				con = getConnection();
	
			String q = "insert into wanted (url, seek, email) values (?,?,?);";
			PreparedStatement stmt = con.prepareStatement(q);
			stmt.setString(1, website);
			stmt.setString(2, search);
			stmt.setString(3, email);
			stmt.executeUpdate();
			logger.log( Level.INFO, "inserted search for {0} from {1} on {2}", new Object[]{search, email, website});
		} catch (Exception x) {
			logger.log( Level.SEVERE, x.toString(), x );
			return false;
		}
		return true;
	}
	
	private Connection getConnection() throws Exception {
		URI dbUri = new URI(System.getenv("DB_URL"));

		String username = dbUri.getUserInfo().split(":")[0];
		String password = dbUri.getUserInfo().split(":")[1];
		String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + dbUri.getPath();
		return DriverManager.getConnection(dbUrl, username, password);
	}

}
