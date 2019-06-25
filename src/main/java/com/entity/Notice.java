package com.entity;

import java.util.Date;
//公告表
public class Notice {
	private Integer noid;//编号
	private String noTitle;//标题
	private String noContent;//内容
	private Integer admid;//发布人
	private String noTime;//发布时间
	private Integer noState;//状态
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
	public Integer getAdmid() {
		return admid;
	}
	public void setAdmid(Integer admid) {
		this.admid = admid;
	}
	public String getNoTime() {
		return noTime;
	}
	public void setNoTime(String noTime) {
		this.noTime = noTime;
	}
	public Integer getNoState() {
		return noState;
	}
	public void setNoState(Integer noState) {
		this.noState = noState;
	}
	public String getNoContent() {
		return noContent;
	}
	public void setNoContent(String noContent) {
		this.noContent = noContent;
	}
	@Override
	public String toString() {
		return "Notice [noid=" + noid + ", noTitle=" + noTitle + ", noContent=" + noContent + ", admid=" + admid
				+ ", noTime=" + noTime + ", noState=" + noState + "]";
	}
	
}
