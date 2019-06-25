package com.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.NoticeDao;
import com.entity.Notice;

@Service
public class NoticeService {
	
	@Resource
	NoticeDao noticeDao;

	//查询所有公告
	public List<Map<String,Object>> findNotice(String noTitle,Integer page){
		return noticeDao.findNotice(noTitle,(page-1)*9);
	}
	//按照公告id查询
	public Notice findByNoid(Integer noid) {
		return noticeDao.findByNoid(noid);
	}
	//添加
	public int addNotice(Notice n) {
		return noticeDao.addNotice(n);
	}
	//修改
	public int updNotice(Notice n){
		return noticeDao.updNotice(n);
	}
	//修改公告状态
	public int updNoticeState(Integer noid,Integer noState) {
		return noticeDao.updNoticeState(noid, noState);
	}
	public Integer countNotice() {
		return noticeDao.countNotice();
	}

}
