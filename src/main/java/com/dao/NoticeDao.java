package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Notice;
@Mapper
public interface NoticeDao {
	//查询所有公告
	public List<Notice> findNotice();
	//按照noid查询公告
	public Notice findByNoid(Integer noid);
	//添加
	public int addNotice(Notice n);
	//修改
	public int updNotice(Notice n);	
	//修改公告状态
	public int updNoticeState(Integer noid,Integer noState);
	
 }
