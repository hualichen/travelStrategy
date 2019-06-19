package com.entity;

import java.util.Date;
//公告表
public class Notice {
	private Integer noid;
	private String noTitle;
	private String admid;
	private Date noTime;
	private Integer noState;
	public Integer getNoid() {
		return noid;
	}
	public void setNoid(Integer noid) {
		this.noid = noid;
	}
	public String getNoTitle() {
		return noTitle;
	}
	public void setNoTitle(String noTitle) {
		this.noTitle = noTitle;
	}
	public String getAdmid() {
		return admid;
	}
	public void setAdmid(String admid) {
		this.admid = admid;
	}
	public Date getNoTime() {
		return noTime;
	}
	public void setNoTime(Date noTime) {
		this.noTime = noTime;
	}
	public Integer getNoState() {
		return noState;
	}
	public void setNoState(Integer noState) {
		this.noState = noState;
	}
	@Override
	public String toString() {
		return "Notice [noid=" + noid + ", noTitle=" + noTitle + ", admid=" + admid + ", noTime=" + noTime
				+ ", noState=" + noState + "]";
	}
	
}
