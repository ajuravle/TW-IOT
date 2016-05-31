DROP TABLE CAMERE_DISPOZITIVE;
DROP TABLE ACTIVITATE_SI;
DROP TABLE ACTIVITATE_CAFETIERA;
DROP TABLE ACTIVITATE_TV;
DROP TABLE TELEVIZOR;
DROP TABLE CANALE;
DROP TABLE FRIGIDER;
DROP TABLE MASINA_DE_SPALAT;
DROP TABLE TERMOSTAT;
DROP TABLE CAFETIERA;
DROP TABLE SISTEM_DE_ILUMINAT;
DROP TABLE USERI_CAMERE;
DROP TABLE USERI;
DROP TABLE CAMERE;

CREATE TABLE CAMERE(
	id_camera VARCHAR(6),
	denumire VARCHAR(45),
	PRIMARY KEY (id_camera)
	);

CREATE TABLE USERI(
	id_user VARCHAR(6),
	parola VARCHAR(500),
	nume VARCHAR(45),
	prenume VARCHAR(45),
	mail VARCHAR(45),
	tip VARCHAR(45),
	PRIMARY KEY (id_user)
	);
	
CREATE TABLE USERI_CAMERE(
	id_uc VARCHAR(6),
	id_user VARCHAR(6),
	id_camera VARCHAR(6),
	PRIMARY KEY (id_uc),
	FOREIGN KEY (id_user) REFERENCES USERI(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_camera) REFERENCES CAMERE(id_camera) ON DELETE CASCADE ON UPDATE CASCADE
	);
	
CREATE TABLE SISTEM_DE_ILUMINAT(
	id_dispozitiv VARCHAR(6),
	denumire VARCHAR(45),
	stare TINYINT(1),
	intensitate INT,
	nr_becuri_aprinse INT,
	PRIMARY KEY (id_dispozitiv)
	);
	
CREATE TABLE CAFETIERA(
	id_dispozitiv VARCHAR(6),
	denumire VARCHAR(45),
	zahar INT,
	tip VARCHAR(45),
	stare TINYINT(1),
	PRIMARY KEY (id_dispozitiv)
	);

CREATE TABLE TERMOSTAT(
	id_dispozitiv VARCHAR(6),
	denumire VARCHAR(45),
	stare TINYINT(1),
	temperatura INT,
	PRIMARY KEY (id_dispozitiv)
	);

CREATE TABLE MASINA_DE_SPALAT(
	id_dispozitiv VARCHAR(6),
	denumire VARCHAR(45),
	stare TINYINT(1),
	temperatura INT,
	nr_rotatii INT,
	program VARCHAR(45),
	timp_ramas INT,
	PRIMARY KEY (id_dispozitiv)
	);

CREATE TABLE FRIGIDER(
	id_dispozitiv VARCHAR(6),
	denumire VARCHAR(45),
	temperatura_frigider INT,
	temperatura_congelator INT,
	stare TINYINT(1),
	PRIMARY KEY (id_dispozitiv)
	);

	
CREATE TABLE CANALE(
	id_canal VARCHAR(6),
	denumire VARCHAR(45),
	
	PRIMARY KEY (id_canal)
	);

CREATE TABLE TELEVIZOR(
	id_dispozitiv VARCHAR(6),
	id_canal VARCHAR(6),
	denumire VARCHAR(45),
	volum INT,
	luminozitate INT,
	stare TINYINT(1),
	PRIMARY KEY (id_dispozitiv),
	FOREIGN KEY (id_canal) REFERENCES CANALE(id_canal) ON DELETE CASCADE ON UPDATE CASCADE
	);

CREATE TABLE ACTIVITATE_TV(
	id_activitate VARCHAR(6),
	id_dispozitiv VARCHAR(6),
	id_canal VARCHAR(6),
	ora INT,
	volum INT,
	FOREIGN KEY (id_dispozitiv) REFERENCES TELEVIZOR(id_dispozitiv) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_canal) REFERENCES CANALE(id_canal) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (id_activitate)
	);

CREATE TABLE ACTIVITATE_CAFETIERA(
	id_activitate VARCHAR(6),
	id_dispozitiv VARCHAR(6),
	ora INT,
	zahar INT,
	tip VARCHAR(45),
	FOREIGN KEY (id_dispozitiv) REFERENCES CAFETIERA(id_dispozitiv) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (id_activitate)
	);

CREATE TABLE ACTIVITATE_SI(
	id_activitate VARCHAR(6),
	id_dispozitiv VARCHAR(6),
	ora INT,
	intensitate INT,
	nr_becuri_aprinse INT,
	FOREIGN KEY (id_dispozitiv) REFERENCES CAFETIERA(id_dispozitiv) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (id_activitate)
	);

CREATE TABLE CAMERE_DISPOZITIVE(
	id_cd VARCHAR(6),
	id_camera VARCHAR(6),
	id_dispozitiv VARCHAR(6),
	FOREIGN KEY (id_camera) REFERENCES CAMERE(id_camera) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (id_cd)
	);