package de.eliyo.service;

import java.net.URI;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import de.eliyo.beans.Wanted;

@ManagedBean
@RequestScoped
public class SearchService {

	private static final Logger logger = Logger.getLogger( SearchService.class.getName() );

	public boolean insert(Wanted w) {
		Connection con = null;
		try {
			con = getConnection();
	
			String q = "insert into wanted (url, seek, email, interval) values (?,?,?,?);";
			PreparedStatement stmt = con.prepareStatement(q);
			stmt.setString(1, w.getWeburl());
			stmt.setString(2, w.getSearch());
			stmt.setString(3, w.getEmail());
			stmt.setInt(4, w.getInterval());
			stmt.executeUpdate();
			logger.log( Level.INFO, "inserted search for {0} from {1} on {2}",
					new Object[]{w.getSearch(), w.getEmail(), w.getWeburl()});
		} catch (Exception x) {
			logger.log( Level.SEVERE, x.toString(), x );
			return false;
		} finally {
			closeConnection(con);
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
	
	
	private void closeConnection(Connection con) {
		try {
			con.close();
		} catch(Exception x){
			logger.log( Level.SEVERE, x.toString(), x );
		}
	}
}
