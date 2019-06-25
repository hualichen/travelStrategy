package com.entity;

public class JourneyDetails {
	private int	jdid;
	private String	scid;
	private int	joid;
	private String	describes;
	private String	scenicimg;
	private String	tickets;
	private String	catering;
	private String	foodimgs;;
	private String	stay;
	private String	traffic;
	private String	day;
	private String	path;
	public JourneyDetails(int jdid, String scid, int joid, String describes, String scenicimg, String tickets,
			String catering, String foodimgs, String stay, String traffic, String day, String path) {
		super();
		this.jdid = jdid;
		this.scid = scid;
		this.joid = joid;
		this.describes = describes;
		this.scenicimg = scenicimg;
		this.tickets = tickets;
		this.catering = catering;
		this.foodimgs = foodimgs;
		this.stay = stay;
		this.traffic = traffic;
		this.day = day;
		this.path = path;
	}
	public JourneyDetails() {
		super();
	}
	public int getJdid() {
		return jdid;
	}
	public void setJdid(int jdid) {
		this.jdid = jdid;
	}
	public String getScid() {
		return scid;
	}
	public void setScid(String scid) {
		this.scid = scid;
	}
	public int getJoid() {
		return joid;
	}
	public void setJoid(int joid) {
		this.joid = joid;
	}
	public String getDescribes() {
		return describes;
	}
	public void setDescribes(String describes) {
		this.describes = describes;
	}
	public String getScenicimg() {
		return scenicimg;
	}
	public void setScenicimg(String scenicimg) {
		this.scenicimg = scenicimg;
	}
	public String getTickets() {
		return tickets;
	}
	public void setTickets(String tickets) {
		this.tickets = tickets;
	}
	public String getCatering() {
		return catering;
	}
	public void setCatering(String catering) {
		this.catering = catering;
	}
	public String getFoodimgs() {
		return foodimgs;
	}
	public void setFoodimgs(String foodimgs) {
		this.foodimgs = foodimgs;
	}
	public String getStay() {
		return stay;
	}
	public void setStay(String stay) {
		this.stay = stay;
	}
	public String getTraffic() {
		return traffic;
	}
	public void setTraffic(String traffic) {
		this.traffic = traffic;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	@Override
	public String toString() {
		return "JourneyDetails [jdid=" + jdid + ", scid=" + scid + ", joid=" + joid + ", describes=" + describes
				+ ", scenicimg=" + scenicimg + ", tickets=" + tickets + ", catering=" + catering + ", foodimgs="
				+ foodimgs + ", stay=" + stay + ", traffic=" + traffic + ", day=" + day + ", path=" + path + "]";
	}
	
	

}
