package de.eliyo.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import eliyo.de.main.DatabaseController;

@ManagedBean
@RequestScoped
public class SearchBean {

	private String email;
	private String search;
	private String weburl;
	
	private String alertBadge;
	private String alertMessage;

	public String submit() {
		DatabaseController contr = new DatabaseController();

		if (contr.insert(email, search, weburl))
			handleSuccess();
		else 
			handleFailure();
		
		return "";
	}
	
	private void handleSuccess() {
		alertBadge   = "alert-success";
		alertMessage = "Success! added: " + search + " on website: " + weburl + " for user: " + email;
		
		search = "";
		weburl = "";
	}

	private void handleFailure() {
		alertBadge   = "alert-danger";
		alertMessage = "Error! Sorry something went wrong, please try again";
	}
	
	public String getAlertBadge() {
		return alertBadge == null ? "collapse" : alertBadge;
	}
	
	public String getAlertMessage() {
		return alertMessage;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getWeburl() {
		return weburl;
	}

	public void setWeburl(String weburl) {
		this.weburl = weburl;
	}

}