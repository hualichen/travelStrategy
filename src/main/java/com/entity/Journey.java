package com.entity;

public class Journey {
	public int	joid;
	public String joTitle;
	public String	scid;
	public String	bestTime;
	public int	joDays;
	public String	summary;
	public int	joState;
	public Journey() {
		super();
	}
	public Journey(int joid, String joTitle, String scid, String bestTime, int joDays, String summary, int joState) {
		super();
		this.joid = joid;
		this.joTitle = joTitle;
		this.scid = scid;
		this.bestTime = bestTime;
		this.joDays = joDays;
		this.summary = summary;
		this.joState = joState;
	}
	public int getJoid() {
		return joid;
	}
	public void setJoid(int joid) {
		this.joid = joid;
	}
	public String getJoTitle() {
		return joTitle;
	}
	public void setJoTitle(String joTitle) {
		this.joTitle = joTitle;
	}
	public String getScid() {
		return scid;
	}
	public void setScid(String scid) {
		this.scid = scid;
	}
	public String getBestTime() {
		return bestTime;
	}
	public void setBestTime(String bestTime) {
		this.bestTime = bestTime;
	}
	public int getJoDays() {
		return joDays;
	}
	public void setJoDays(int joDays) {
		this.joDays = joDays;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public int getJoState() {
		return joState;
	}
	public void setJoState(int joState) {
		this.joState = joState;
	}
	@Override
	public String toString() {
		return "Journey [joid=" + joid + ", joTitle=" + joTitle + ", scid=" + scid + ", bestTime=" + bestTime
				+ ", joDays=" + joDays + ", summary=" + summary + ", joState=" + joState + "]";
	}
	
}
