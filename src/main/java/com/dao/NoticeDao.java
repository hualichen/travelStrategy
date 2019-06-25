package com.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.entity.Notice;
@Mapper
public interface NoticeDao {
	//查询所有公告
	public List<Map<String,Object>> findNotice(@Param("noTitle")String noTitle,Integer page);
	//按照noid查询公告
	public Notice findByNoid(Integer noid);
	//添加
	public int addNotice(Notice n);
	//修改
	public int updNotice(Notice n);	
	//修改公告状态
	public int updNoticeState(Integer noid,Integer noState);
	//获取公告的条数
	public int countNotice();
	
 }
