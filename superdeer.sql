/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 8.0.32 : Database - superdeer
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`superdeer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `superdeer`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `category_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '类别名称',
  `deleted` int DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `category` */

insert  into `category`(`category_id`,`category_name`,`deleted`) values 
(1,'川菜',0),
(2,'闽菜',0),
(3,'粤菜',0),
(4,'热菜',0),
(5,'凉菜',0),
(6,'东北',1),
(7,'东北菜',0),
(8,'类别',1),
(9,'川菜',1),
(10,'东北菜1',1),
(11,'招牌',1);

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `customer_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `customer_birthday` date DEFAULT NULL COMMENT '生日',
  `customer_sex` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '男' COMMENT '性别',
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `customer_chk_1` CHECK (((`customer_sex` = _utf8mb4'男') or (`customer_sex` = _utf8mb4'女')))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `customer` */

insert  into `customer`(`customer_id`,`customer_name`,`customer_birthday`,`customer_sex`) values 
(1,'陈二三','2022-01-21','男'),
(2,'张东','2022-01-21','女'),
(4,'李四','2022-01-02','男'),
(5,'ccb','2022-01-02','男'),
(6,'ccb1','2022-01-02','男'),
(7,'ccb3','2022-01-02','男'),
(8,'ccb41','2022-01-02','男'),
(9,'黄伟','2016-01-05','女');

/*Table structure for table `customerinfo` */

DROP TABLE IF EXISTS `customerinfo`;

CREATE TABLE `customerinfo` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_pwd` varchar(20) NOT NULL,
  `customer_account` varchar(20) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `customerinfo` */

insert  into `customerinfo`(`customer_id`,`customer_pwd`,`customer_account`) values 
(1,'admin','admin'),
(2,'abc','abc'),
(5,'1234','1234'),
(6,'1234','1234'),
(7,'123456','admin'),
(8,'1234','123'),
(9,'5884688','283623217');

/*Table structure for table `foodtable` */

DROP TABLE IF EXISTS `foodtable`;

CREATE TABLE `foodtable` (
  `foodtable_id` int NOT NULL AUTO_INCREMENT COMMENT '餐桌id',
  `foodtable_number` int NOT NULL COMMENT '餐桌可用餐人数',
  `foodtable_state` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '餐桌的状态',
  `foodtable_position` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '餐桌的位置描述',
  `deleted` int NOT NULL DEFAULT '0' COMMENT '1为删除，0为存在',
  PRIMARY KEY (`foodtable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `foodtable` */

insert  into `foodtable`(`foodtable_id`,`foodtable_number`,`foodtable_state`,`foodtable_position`,`deleted`) values 
(1,5,'有人','四号桌',0),
(2,7,'有人','un海鸥',1),
(3,8,'有人','五号桌',0),
(4,5,'有人','二号桌',0),
(5,5,'有人','一号桌',0),
(6,3,'有人','1号桌',0),
(7,3,'有人','1号桌',1),
(9,5,'undefined','undefined',1),
(10,5,'undefined','几楼几桌',1),
(11,5,'空','几楼几桌',1);

/*Table structure for table `meals` */

DROP TABLE IF EXISTS `meals`;

CREATE TABLE `meals` (
  `meals_id` int NOT NULL AUTO_INCREMENT COMMENT '菜品id',
  `meals_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品名称',
  `meals_category` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品分类',
  `meals_price` int NOT NULL COMMENT '菜品价格',
  `meals_image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品图片地址',
  `meals_describe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜品描述',
  `meals_count` int NOT NULL COMMENT '菜品库存',
  `deleted` int NOT NULL DEFAULT '0' COMMENT '1为未删除，0为删除',
  PRIMARY KEY (`meals_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `meals` */

insert  into `meals`(`meals_id`,`meals_name`,`meals_category`,`meals_price`,`meals_image`,`meals_describe`,`meals_count`,`deleted`) values 
(1,'干锅包菜','粤菜',20,'http://118.31.47.122:3280/menus/香煎龙利鱼减脂燃烧饭（冬）.jpg','好吃,美味',100,0),
(2,'拌黄瓜','川菜',10,'http://118.31.47.122:3280/menus/香煎龙利鱼减脂燃烧饭（冬）.jpg','好吃,美味!!',20,0),
(3,'玉米汁','闽菜',20,'http://118.31.47.122:3280/menus/香煎龙利鱼减脂燃烧饭（冬）.jpg','好吃,好吃',30,0),
(7,',','',80,'http://dummyimage.com/250x250','只关一得史米传南按布山红老。张也际派向世示积作把并米速象接定飞每。小米却识领线家造克红族路带。此经都方划斯大观组必声常也线组为。边那此置要多思气斗较千持即进并式。',67,1),
(8,'123','231',58,'http://192.168.123.124:3280/static/mealsImages/4_资金.png','收厂维示音前象问目变近儿形合联写装识。包则几基住共下她系资干效教很结家争。军样目己多进连和离千方青农三热石。该解列温技化除集青段真求素新又反事。年复安交指相商动术清算道养。',13,1),
(9,'辣椒炒菜','热菜',10,'http://118.31.47.122:3280/menus/低GI嫩煎龙利鱼活力碗.jpg','菜品描述',11,0),
(10,'剁椒鱼头','粤菜',80,'http://192.168.123.124:3280/static/mealsImages/QQ截图20221227135502.png','很好吃的一道菜',11,0);

/*Table structure for table `staff` */

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `staff_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名字',
  `staff_sex` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '男' COMMENT '性别',
  `staff_age` int NOT NULL COMMENT '年龄',
  `staff_salary` int DEFAULT '10' COMMENT '薪资',
  `deleted` int DEFAULT '0',
  PRIMARY KEY (`staff_id`),
  CONSTRAINT `staff_chk_1` CHECK (((`staff_sex` = _utf8mb4'男') or (`staff_sex` = _utf8mb4'女')))
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `staff` */

insert  into `staff`(`staff_id`,`staff_name`,`staff_sex`,`staff_age`,`staff_salary`,`deleted`) values 
(1,'张三三','男',18,3000,0),
(2,'李四','男',20,3500,0),
(11,'高芳','男',58,9224,1),
(12,'陈霞','女',27,5488,0),
(13,'武杰','男',26,8671,0),
(14,'武洋','女',27,9226,0),
(15,'白静','男',33,8923,0),
(16,'郝娜','男',26,3952,0),
(17,'薛芳','女',55,9430,0),
(18,'崔磊','女',31,3010,0),
(19,'高伟','男',39,5557,1),
(20,'刘敏','男',49,8820,0),
(21,'高娜','女',28,9093,0),
(22,'常桂英','男',58,7118,0),
(23,'万丽','女',43,9135,1),
(24,'张三','男',18,2500,1),
(25,'张三','男',18,2500,1),
(26,'张三','男',18,2500,1),
(27,'张三','男',18,2500,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
