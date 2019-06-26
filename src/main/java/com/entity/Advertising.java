package com.entity;

import java.util.Date;

public class Advertising {
	private Integer advid;//编号
	private String advName;//标题
	private Date advTime;//发布时间
	private Integer scid; //景区
	private Integer advState;//状态
	private String advPhoto;//海报
	public Integer getAdvid() {
		return advid;
	}
	public void setAdvid(Integer advid) {
		this.advid = advid;
	}
	public String getAdvName() {
		return advName;
	}
	public void setAdvName(String advName) {
		this.advName = advName;
	}
	public Date getAdvTime() {
		return advTime;
	}
	public void setAdvTime(Date advTime) {
		this.advTime = advTime;
	}
	public Integer getScid() {
		return scid;
	}
	public void setScid(Integer scid) {
		this.scid = scid;
	}
	public Integer getAdvState() {
		return advState;
	}
	public void setAdvState(Integer advState) {
		this.advState = advState;
	}
	public String getAdvPhoto() {
		return advPhoto;
	}
	public void setAdvPhoto(String advPhoto) {
		this.advPhoto = advPhoto;
	}
	public Advertising(Integer advid, String advName, Date advTime, Integer scid, Integer advState, String advPhoto) {
		super();
		this.advid = advid;
		this.advName = advName;
		this.advTime = advTime;
		this.scid = scid;
		this.advState = advState;
		this.advPhoto = advPhoto;
	}
}
