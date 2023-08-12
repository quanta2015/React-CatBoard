/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云121.40.124.170
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 121.40.124.170:3306
 Source Schema         : zm

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 12/08/2023 13:50:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tab_board
-- ----------------------------
DROP TABLE IF EXISTS `tab_board`;
CREATE TABLE `tab_board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `board_id` varchar(40) DEFAULT NULL,
  `board_type` varchar(10) DEFAULT NULL,
  `category` varchar(10) DEFAULT NULL,
  `sub_date` varchar(20) DEFAULT NULL,
  `sub_user` varchar(40) DEFAULT NULL,
  `addr` json DEFAULT NULL,
  `cat` json DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `fav` json DEFAULT NULL,
  `favCount` int(11) DEFAULT NULL,
  `see` json DEFAULT NULL,
  `close` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=555 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tab_chat
-- ----------------------------
DROP TABLE IF EXISTS `tab_chat`;
CREATE TABLE `tab_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(40) DEFAULT NULL,
  `board_id` varchar(40) DEFAULT NULL,
  `cat_img` varchar(20) DEFAULT NULL,
  `cat_name` varchar(50) DEFAULT NULL,
  `user_fr` varchar(40) DEFAULT NULL,
  `user_to` varchar(40) DEFAULT NULL,
  `sub_date` varchar(20) DEFAULT NULL,
  `content` json DEFAULT NULL,
  `unread` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tab_collect
-- ----------------------------
DROP TABLE IF EXISTS `tab_collect`;
CREATE TABLE `tab_collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) DEFAULT NULL,
  `board_id` varchar(40) DEFAULT NULL,
  `col_date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tab_msg
-- ----------------------------
DROP TABLE IF EXISTS `tab_msg`;
CREATE TABLE `tab_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fr` varchar(40) DEFAULT NULL,
  `to` varchar(40) DEFAULT NULL,
  `fr_icon` varchar(100) DEFAULT NULL,
  `board_id` varchar(40) DEFAULT NULL,
  `msg_title` varchar(200) DEFAULT NULL,
  `msg_type` varchar(10) DEFAULT NULL,
  `msg_date` varchar(20) DEFAULT NULL,
  `read` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tab_question
-- ----------------------------
DROP TABLE IF EXISTS `tab_question`;
CREATE TABLE `tab_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(20000) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `sub_date` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tab_user
-- ----------------------------
DROP TABLE IF EXISTS `tab_user`;
CREATE TABLE `tab_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) DEFAULT NULL,
  `mail` varchar(30) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `pwd` varchar(30) DEFAULT NULL,
  `user_name` varchar(30) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Procedure structure for DEBUG_MSG
-- ----------------------------
DROP PROCEDURE IF EXISTS `DEBUG_MSG`;
delimiter ;;
CREATE PROCEDURE `zm`.`DEBUG_MSG`(msg VARCHAR(16383))
BEGIN
    select concat('**', msg) AS '** DEBUG:';
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_ADD_QUESTION
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_ADD_QUESTION`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_ADD_QUESTION`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id VARCHAR(40);
	DECLARE _mail VARCHAR(40);
	DECLARE _title VARCHAR(200);
	DECLARE _sub_date VARCHAR(20);
	DECLARE _content VARCHAR(1000);
	
	-- 解析 JSON 数据
	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_id'));
	SET _mail = JSON_UNQUOTE(JSON_EXTRACT(data, '$.mail'));
	SET _title = JSON_UNQUOTE(JSON_EXTRACT(data, '$.title'));
	SET _content = JSON_UNQUOTE(JSON_EXTRACT(data, '$.content'));
	SET _sub_date = NOW();
	
	
	
	insert into tab_question(user_id,mail,title,content,sub_date)
	VALUES(_user_id,_mail,_title,_content,_sub_date);
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CLOSE_BOARD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CLOSE_BOARD`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_CLOSE_BOARD`(IN `data` json)
BEGIN
	DECLARE _board_id VARCHAR(40);
	SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.board_id'));
  UPDATE tab_board SET close = 1 WHERE board_id=_board_id;
  
	select * from tab_board WHERE board_id = _board_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_CLOSE_POST
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_CLOSE_POST`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_CLOSE_POST`(IN `data` json)
BEGIN
	DECLARE _board_id VARCHAR(40);
	
	SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.board_id'));
  UPDATE tab_board SET category = '解決' WHERE board_id=_board_id;
  
	select * from tab_board WHERE board_id = _board_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_DEL_BOARD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_DEL_BOARD`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_DEL_BOARD`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _board_id VARCHAR(40);

    SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));
    DELETE FROM tab_board WHERE  board_id = _board_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_DEL_NOTE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_DEL_NOTE`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_DEL_NOTE`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _board_id VARCHAR(40);

    SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));
    DELETE FROM tab_board WHERE  board_id = _board_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_INIT_CHAT_ID
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_INIT_CHAT_ID`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_INIT_CHAT_ID`(IN `data_json` json)
BEGIN
    DECLARE v_chat_id VARCHAR(40);
    DECLARE v_sub_date VARCHAR(20);
    DECLARE v_content JSON;
    DECLARE v_board_id VARCHAR(40);
    DECLARE v_user_fr VARCHAR(40);
    DECLARE v_user_to VARCHAR(40);
    DECLARE v_cat_name VARCHAR(50);
    DECLARE v_cat_img VARCHAR(20);
    DECLARE v_exists INT;
		DECLARE result_id INT;

    SET v_chat_id = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.chat_id'));
    SET v_sub_date = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.sub_date'));
    SET v_content = JSON_EXTRACT(data_json, '$.content');
    SET v_board_id = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.board_id'));
    SET v_user_fr = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.user_fr'));
    SET v_user_to = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.user_to'));
    SET v_cat_name = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.cat_name'));
    SET v_cat_img = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.cat_img'));

    -- 检查是否存在该记录
    SELECT COUNT(*) INTO v_exists FROM tab_chat WHERE board_id = v_board_id AND user_fr = v_user_fr;

    IF v_exists = 0 THEN
        INSERT INTO tab_chat (chat_id, sub_date, content, board_id, user_fr, user_to, cat_name, cat_img)
        VALUES (v_chat_id, v_sub_date, v_content, v_board_id, v_user_fr, v_user_to, v_cat_name, v_cat_img);
        SET result_id = LAST_INSERT_ID(); -- 获取最后插入的ID
    ELSE
        SELECT id INTO result_id FROM tab_chat WHERE board_id = v_board_id AND user_fr = v_user_fr LIMIT 1; -- 如果存在，则返回该记录的ID
    END IF;
		
		select result_id as chat_id from dual;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_LOAD_MSG
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_LOAD_MSG`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_LOAD_MSG`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id VARCHAR(40);
	
	-- 解析 JSON 数据
	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_id'));
	
	select 
		m.id as mid,m.fr,m.to,m.fr_icon,m.msg_title,msg_type,msg_date,u.user_name,b.*
	from 
		tab_msg m, tab_user u, tab_board b
	WHERE 
		m.`to` = _user_id and m.fr = u.user_id and `read` = 0 and m.board_id = b.board_id
	order by 
		sub_date desc
	limit 10;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_LOGIN
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_LOGIN`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_LOGIN`(IN `data` varchar(20000))
BEGIN
	DECLARE _mail  varchar(20) 	default null;
  DECLARE _pwd 	varchar(50) 	default null;

	SET _mail = JSON_UNQUOTE(JSON_EXTRACT(data,'$.mail'));
	SET _pwd = JSON_UNQUOTE(JSON_EXTRACT(data,'$.pwd'));
	
	SELECT * FROM tab_user WHERE mail = _mail AND pwd = _pwd;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY`(IN `data` varchar(20000))
BEGIN
	SET @sql = JSON_UNQUOTE(JSON_EXTRACT(data,'$.sql'));

	PREPARE stmt FROM @sql ; 
	EXECUTE stmt ;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_BOARD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_BOARD`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_BOARD`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _bt VARCHAR(20);
    DECLARE _ca VARCHAR(20);
    DECLARE _od VARCHAR(20);
    DECLARE _li INT;
    
    -- 解析 JSON 数据
    SET _bt = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.bt'));
    SET _ca = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.ca'));
    SET _od = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.od'));
    SET _li = JSON_EXTRACT(jsonData, '$.li');
		
    SET @sql := CONCAT('SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see, close 
                        FROM tab_board WHERE board_type = "', _bt, '" AND category = "', _ca, '" ORDER BY ', _od, ' desc LIMIT ', _li);

    PREPARE stmt_handle FROM @sql;
		EXECUTE stmt_handle;
    DEALLOCATE PREPARE stmt_handle;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_BY_ME
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_BY_ME`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_BY_ME`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _sub_user VARCHAR(40);
    DECLARE _key VARCHAR(40);
    DECLARE _cond VARCHAR(40);
    
    -- 解析 JSON 数据
    SET _sub_user = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.sub_user'));
    SET _key = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.key'));
    SET _cond = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.cond'));

    SET @query_str = CONCAT('SELECT * FROM tab_board WHERE sub_user = "', _sub_user, '" AND ');
    
    IF _key IS NOT NULL AND _key != '' THEN
        SET @query_str = CONCAT(@query_str, ' title LIKE "%', _key, '%" AND ');
    END IF;

    CASE _cond
        WHEN 'all' THEN
            SET @query_str = CONCAT(@query_str, " (board_type='cat' OR board_type='qa') ");
        WHEN 'lose' THEN
            SET @query_str = CONCAT(@query_str, " board_type='cat' AND category='迷子' ");
        WHEN 'prot' THEN
            SET @query_str = CONCAT(@query_str, " board_type='cat' AND category='保護' ");
        WHEN 'qa' THEN
            SET @query_str = CONCAT(@query_str, " board_type='qa' AND category='受付中' ");
        WHEN 'qae' THEN
            SET @query_str = CONCAT(@query_str, " board_type='qa' AND category='解決' ");
    END CASE;
    
    SET @query_str = CONCAT(@query_str, ' ORDER BY sub_date DESC LIMIT 100;');

    PREPARE stmt FROM @query_str;
    EXECUTE stmt;
    
    DEALLOCATE PREPARE stmt;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_CAT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_CAT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_CAT`(IN `jsonData` varchar(20000))
BEGIN
		DECLARE _bt VARCHAR(20);
    DECLARE _od VARCHAR(20);
    DECLARE _li INT;
    
    -- 解析 JSON 数据
    SET _bt = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.bt'));
    SET _od = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.od'));
    SET _li = JSON_EXTRACT(jsonData, '$.li');
		
    SET @sql := CONCAT('SELECT board_id, board_type, category, sub_date, sub_user, addr, cat, title, content, fav, favCount, see 
                        FROM tab_board WHERE board_type = "', _bt,'" ORDER BY ', _od, ' desc LIMIT ', _li);
		
		
    PREPARE stmt_handle FROM @sql;
		EXECUTE stmt_handle;
		DEALLOCATE PREPARE stmt_handle;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_CHAT_FR
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_CHAT_FR`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_CHAT_FR`(IN `data_json` json)
BEGIN
    DECLARE _user_id VARCHAR(40);

    SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.user_id'));

		
		
		select 
			c.*, u1.user_name as to_name, u1.icon as to_icon,u2.user_name as fr_name, u2.icon as fr_icon  
		from 
			tab_chat c,tab_user u1 ,tab_user u2
		where 
			user_fr = _user_id and c.user_to = u1.user_id and c.user_fr = u2.user_id;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_CHAT_TO
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_CHAT_TO`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_CHAT_TO`(IN `data_json` json)
BEGIN
    DECLARE _user_id VARCHAR(40);

    SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data_json, '$.user_id'));

		
-- 		select c.*, u.user_name, u.icon from tab_chat c,tab_user u where user_to = _user_id and c.user_to = u.user_id;
		
		select 
			c.*, u1.user_name as to_name, u1.icon as to_icon,u2.user_name as fr_name, u2.icon as fr_icon  
		from 
			tab_chat c,tab_user u1,tab_user u2
		where 
			user_to = _user_id and c.user_to = u1.user_id and c.user_fr = u2.user_id;
			
			
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_COLLECT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_COLLECT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_COLLECT`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id  varchar(40) 	default null;
	DECLARE _cond     varchar(40) 	default null;
	DECLARE _key      varchar(100) 	default null;

	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data,'$.user_id'));
	SET _cond    = JSON_UNQUOTE(JSON_EXTRACT(data,'$.cond'));
	SET _key     = JSON_UNQUOTE(JSON_EXTRACT(data,'$.key'));

	SET @query_str = CONCAT('SELECT c.user_id,c.col_date,b.* FROM tab_collect c,tab_board b WHERE c.user_id ="', _user_id, '" AND c.board_id = b.board_id AND');
	
	CASE _cond
		WHEN 'lose' THEN
			SET @query_str = CONCAT(@query_str, " board_type='cat' AND category='迷子' ");
		WHEN 'prot' THEN
			SET @query_str = CONCAT(@query_str, " board_type='cat' AND category='保護' ");
		WHEN 'note' THEN
			SET @query_str = CONCAT(@query_str, " board_type='note' AND category='NULL' ");
		ELSE
			SET @query_str = CONCAT(@query_str, " 1=1 "); -- 默认条件，或你可以添加自己的逻辑
	END CASE;

	IF _key IS NOT NULL AND _key != '' THEN
		SET @query_str = CONCAT(@query_str, ' AND (b.title LIKE "%', _key, '%" OR b.cat LIKE "%', _key, '%") ');
	END IF;
	
	
	SET @query_str = CONCAT(@query_str, ' ORDER BY sub_date DESC;');

	PREPARE stmt FROM @query_str;
	EXECUTE stmt;
	
	DEALLOCATE PREPARE stmt;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_QUESTION
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_QUESTION`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_QUESTION`(IN `data` varchar(20000))
BEGIN
	select * from tab_question q order by sub_date desc;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_QUERY_USER
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_QUERY_USER`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_QUERY_USER`(IN `data` varchar(20000))
BEGIN
	
	SELECT * FROM tab_user ;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_READ_MSG
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_READ_MSG`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_READ_MSG`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id VARCHAR(40);
	DECLARE _mid INT;
	-- 解析 JSON 数据
	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_id'));
	SET _mid = JSON_EXTRACT(data, '$.mid');
	
	UPDATE tab_msg SET `read` = 1 WHERE id = _mid;
	
	select 
		m.id as mid,m.fr,m.to,m.fr_icon,m.msg_title,msg_type,msg_date,u.user_name,b.*
	from 
		tab_msg m, tab_user u, tab_board b
	WHERE 
		m.`to` = _user_id and m.fr = u.user_id and `read` = 0 and m.board_id = b.board_id
	order by 
		sub_date desc;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_REG
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_REG`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_REG`(IN `jsonData` varchar(20000))
BEGIN
		DECLARE _name VARCHAR(255);
    DECLARE _user_name VARCHAR(255);
    DECLARE _mail VARCHAR(255);
    DECLARE _pwd VARCHAR(255);
    DECLARE _icon JSON;
    DECLARE _user_id VARCHAR(36);
    DECLARE userCount INT;
		DECLARE lastId INT;
    
    -- 解析 JSON 数据
		SET _name = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.name'));
		SET _user_name = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.user_name'));
    SET _mail = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.mail'));
    SET _pwd = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.pwd'));
    SET _icon = JSON_EXTRACT(jsonData, '$.icon');
    SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.user_id'));
    
    -- 检查邮箱是否已经存在
    SELECT COUNT(*) INTO userCount FROM tab_user WHERE mail = _mail;
    
    IF userCount = 0 THEN
        -- 如果邮箱不存在，则插入数据到 tab_user 表
        INSERT INTO tab_user (`name`, user_name, mail, pwd, icon, user_id, user_type)
        VALUES (_name, _user_name, _mail, _pwd, _icon, _user_id, 1);
        
        -- 获取插入的用户记录的 id
        SET lastId = LAST_INSERT_ID();
        
        -- 返回插入的用户记录
        SELECT * FROM tab_user WHERE id = lastId;
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_REPLY_QA
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_REPLY_QA`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_REPLY_QA`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id VARCHAR(40);
	DECLARE _user_icon VARCHAR(200);
	DECLARE _board_id VARCHAR(40);
	DECLARE _title VARCHAR(200);
	DECLARE _sub_date VARCHAR(20);
	DECLARE _content VARCHAR(20000);
	DECLARE _to VARCHAR(40);
	
	-- 解析 JSON 数据
	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_id'));
	SET _user_icon = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_icon'));
	SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.board_id'));
	SET _title = JSON_UNQUOTE(JSON_EXTRACT(data, '$.title'));
	SET _content = JSON_UNQUOTE(JSON_EXTRACT(data, '$.content'));
	SET _to = JSON_UNQUOTE(JSON_EXTRACT(data, '$.to'));
	
	SET _sub_date = NOW();
	
--   CALL DEBUG_MSG(_content);
  -- 创建一个新的 rep 对象
  SET @new_rep = JSON_OBJECT(
    'user_id', _user_id,
    'user_icon', _user_icon,
    'sub_date', _sub_date,
    'content', _content
  );
  
  -- 将新的 rep 对象添加到 content 字段的 rep 数组中
  UPDATE tab_board SET content = JSON_ARRAY_APPEND(content, '$.rep', @new_rep) WHERE board_id = _board_id;
  INSERT INTO tab_msg(fr,`to`,icon,title,sub_date,type,`read`) VALUES(_user_id,_to,_user_icon,_title,_sub_date,'回答',0);
	
	select * from tab_board WHERE board_id = _board_id;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_RESET_UNREAD
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_RESET_UNREAD`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_RESET_UNREAD`(IN `jsonData` varchar(20000))
BEGIN
		DECLARE _id int;
    
    -- 解析 JSON 数据
		SET _id = JSON_EXTRACT(jsonData, '$.id');
    
    
		UPDATE tab_chat SET unread = 0 WHERE id = _id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_CAT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_CAT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_CAT`(IN `jsonData` varchar(20000))
BEGIN
  DECLARE _board_id VARCHAR(40);
  DECLARE _board_type VARCHAR(10);
  DECLARE _category VARCHAR(10);
  DECLARE _sub_date VARCHAR(20);
  DECLARE _user_id VARCHAR(40);
  DECLARE _addr JSON;
  DECLARE _cat JSON;
  DECLARE _exists INT;

  -- 解析 JSON 数据
  SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));
  SET _board_type = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_type'));
  SET _category = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.category'));
  SET _sub_date = NOW();
  SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.sub_user'));
  SET _addr = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.addr'));
  SET _cat = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.cat'));

  -- 检查是否存在记录
  SELECT COUNT(*) INTO _exists FROM tab_board WHERE board_id = _board_id;
  
  

  IF _exists > 0 THEN
    UPDATE tab_board
    SET 
        sub_date = _sub_date,
        sub_user = _user_id,
        addr = _addr,
        cat = _cat
    WHERE board_id = _board_id;
  ELSE
    INSERT INTO tab_board(board_id,board_type,category,sub_date,sub_user,addr,cat,title,content,fav,favCount,see)
    VALUES(_board_id,_board_type,_category,_sub_date,_user_id,_addr,_cat,'','{\"cnt\": \"\", \"rep\": []}','[]',0,'[]');
  END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_CHAT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_CHAT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_CHAT`(IN `jsonData` varchar(20000))
BEGIN
		DECLARE _id int;
		DECLARE _unread int;
    DECLARE _content JSON;
    
    -- 解析 JSON 数据
		SET _id = JSON_EXTRACT(jsonData, '$.id');
		SET _unread = JSON_EXTRACT(jsonData, '$.unread');
		SET _content = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.content'));
    
    
		UPDATE tab_chat SET content = _content, unread = _unread WHERE id = _id;
		SELECT * FROM tab_chat WHERE id = _id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_COLLECT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_COLLECT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_COLLECT`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _board_id VARCHAR(40);
    DECLARE _user_id VARCHAR(40);
    DECLARE _col_date VARCHAR(20);
    DECLARE _exists INT;

    SET _col_date = NOW();
    SET _user_id  = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.user_id'));
    SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));

    -- 检查 board_id 是否存在
    SELECT COUNT(*) INTO _exists FROM tab_collect WHERE board_id = _board_id AND user_id = _user_id;

    -- 如果 board_id 存在，删除记录
    IF _exists > 0 THEN
        DELETE FROM tab_collect WHERE board_id = _board_id AND user_id = _user_id;
    ELSE
        -- 如果 board_id 不存在，插入新记录
        INSERT INTO tab_collect(board_id,user_id,col_date) VALUES(_board_id,_user_id,_col_date);
    END IF;

    SELECT * FROM tab_collect WHERE user_id = _user_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_CONTENT
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_CONTENT`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_CONTENT`(IN `data` json)
BEGIN
	DECLARE _fr VARCHAR(40);
	DECLARE _to VARCHAR(40);
	DECLARE _icon VARCHAR(200);
	DECLARE _board_id VARCHAR(40);
	DECLARE _title VARCHAR(200);
	DECLARE _sub_date VARCHAR(20);
	DECLARE _content json;
	DECLARE _type VARCHAR(20);
	DECLARE lastId INT;

	
	-- 解析 JSON 数据
	SET _fr = JSON_UNQUOTE(JSON_EXTRACT(data, '$.fr'));
	SET _to = JSON_UNQUOTE(JSON_EXTRACT(data, '$.to'));
	SET _icon = JSON_UNQUOTE(JSON_EXTRACT(data, '$.icon'));
	SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.board_id'));
	SET _title = JSON_UNQUOTE(JSON_EXTRACT(data, '$.title'));
	SET _content = JSON_UNQUOTE(JSON_EXTRACT(data, '$.content'));
	SET _sub_date = JSON_UNQUOTE(JSON_EXTRACT(data, '$.sub_date'));
	SET _type = JSON_UNQUOTE(JSON_EXTRACT(data, '$.type'));
	
  
  -- 将新的 rep 对象添加到 content 字段的 rep 数组中
  UPDATE tab_board SET content = _content WHERE board_id=_board_id;
  INSERT INTO tab_msg(fr,`to`,fr_icon,board_id,msg_title,msg_date,msg_type,`read`) VALUES(_fr,_to,_icon,_board_id,_title,_sub_date,_type,0);
	SET lastId = LAST_INSERT_ID();
	
	select * from tab_board WHERE board_id = _board_id;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_NOTE
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_NOTE`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_NOTE`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _board_id VARCHAR(40);
    DECLARE _sub_date VARCHAR(20);
    DECLARE _sub_user VARCHAR(40);
    DECLARE _content JSON;
    DECLARE _cat JSON;
    DECLARE _title VARCHAR(200);

    SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));
    SET _sub_date = NOW();
    SET _sub_user = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.sub_user'));
    SET _content  = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.content'));
    SET _cat  = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.cat'));
    SET _title    = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.title'));

    IF EXISTS (SELECT 1 FROM tab_board WHERE board_id = _board_id) THEN
        UPDATE tab_board
        SET 
            sub_date = _sub_date,
            sub_user = _sub_user,
            title = _title,
            content = _content,
            cat = _cat
        WHERE board_id = _board_id;
    ELSE
        INSERT INTO tab_board(board_id,board_type,category,sub_date,sub_user,title,content,cat,fav,favCount,see)
        VALUES(_board_id,'note','NULL',_sub_date,_sub_user,_title,_content,_cat, '[]', 0, '[]');
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_QA
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_QA`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_QA`(IN `data` varchar(20000))
BEGIN
	DECLARE _user_id VARCHAR(40);
	DECLARE _board_id VARCHAR(40);
	DECLARE _title VARCHAR(200);
	DECLARE _sub_date VARCHAR(20);
	DECLARE _content VARCHAR(1000);
	DECLARE _exists INT;

	-- 解析 JSON 数据
	SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.user_id'));
	SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(data, '$.board_id'));
	SET _title = JSON_UNQUOTE(JSON_EXTRACT(data, '$.title'));
	SET _content = JSON_EXTRACT(data, '$.content');
	SET _sub_date = NOW();

	-- 检查是否存在记录
	SELECT COUNT(*) INTO _exists FROM tab_board WHERE board_id = _board_id;

	IF _exists > 0 THEN
		UPDATE tab_board
		SET title = _title,
		    sub_date = _sub_date,
		    content = _content
		WHERE board_id = _board_id;
	ELSE
		INSERT INTO tab_board(board_id,board_type,category,sub_date,sub_user,title,content,fav,favCount,see)
		VALUES(_board_id,'qa','受付中',_sub_date,_user_id,_title,_content,'[]',0,'[]');
	END IF;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_SAVE_USER
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_SAVE_USER`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_SAVE_USER`(IN `jsonData` varchar(20000))
BEGIN
		DECLARE _name VARCHAR(255);
    DECLARE _user_name VARCHAR(255);
    DECLARE _mail VARCHAR(255);
    DECLARE _pwd VARCHAR(255);
    DECLARE _icon JSON;
    DECLARE _user_id VARCHAR(36);
    
    -- 解析 JSON 数据
		SET _name = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.name'));
		SET _user_name = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.user_name'));
    SET _mail = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.mail'));
    SET _pwd = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.pwd'));
    SET _icon = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.icon'));
    SET _user_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.user_id'));
    
    
		UPDATE tab_user 
			SET `name` = _name, 
					user_name = _user_name, 
					mail = _mail, 
					pwd = _pwd, 
					icon = _icon
			WHERE user_id = _user_id;
			
		-- 返回更新后的用户记录
		SELECT * FROM tab_user WHERE user_id = _user_id;
    
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for PROC_UPDATE_BOARD_FAV
-- ----------------------------
DROP PROCEDURE IF EXISTS `PROC_UPDATE_BOARD_FAV`;
delimiter ;;
CREATE PROCEDURE `zm`.`PROC_UPDATE_BOARD_FAV`(IN `jsonData` varchar(20000))
BEGIN
    DECLARE _board_id VARCHAR(36);
    DECLARE _fav JSON;
    DECLARE _favCount INT;
		
		DECLARE _fr VARCHAR(40);
		DECLARE _to VARCHAR(40);
		DECLARE _icon VARCHAR(200);
		DECLARE _title VARCHAR(200);
		DECLARE _sub_date VARCHAR(20);
		DECLARE _type VARCHAR(20);
		DECLARE _isFav INT;
		DECLARE lastId INT;

    -- 解析 JSON 数据
    SET _board_id = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.board_id'));
    SET _fav = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.fav'));
    SET _favCount = JSON_EXTRACT(jsonData, '$.favCount');
		
		SET _fr = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.fr'));
		SET _to = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.to'));
		SET _icon = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.icon'));
		SET _title = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.title'));
		SET _sub_date = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.sub_date'));
		SET _type = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.type'));
		SET _isFav = JSON_UNQUOTE(JSON_EXTRACT(jsonData, '$.isFav'));

    -- 更新 
    UPDATE tab_board SET favCount = _favCount, fav = _fav WHERE board_id = _board_id;
		
		IF (_isFav=0) then
			INSERT INTO tab_msg(fr,`to`,fr_icon,board_id,msg_title,msg_date,msg_type,`read`) 
			VALUES(_fr,_to,_icon,_board_id,_title,_sub_date,_type,0);
			
			SET lastId = LAST_INSERT_ID();
			
			select 
				m.id as mid,m.fr,m.to,m.fr_icon,m.msg_title,msg_type,msg_date,u.user_name,b.*
			from 
				tab_msg m, tab_user u, tab_board b
			WHERE 
				m.`to` = _to and m.fr = u.user_id and `read` = 0 and m.board_id = b.board_id and m.id = lastId;
		ELSE
			SELECT lastId as mid,t.* FROM tab_msg t where id = -1;
		END IF;
		
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
