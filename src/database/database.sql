DROP TABLE IF EXISTS FinancialTransaction;
DROP TABLE IF EXISTS TransactionCategory;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS UserAccount;
DROP TABLE IF EXISTS AccountType;
DROP TABLE IF EXISTS Bank;


CREATE TABLE Bank (
bankId 		INT 	NOT NULL 	AUTO_INCREMENT,
bankName	VARCHAR(255),

CONSTRAINT bank_PK 
	PRIMARY KEY (bankId),
	
CONSTRAINT bankName_Unique
	UNIQUE (bankName)
);


CREATE TABLE AccountType (
accountTypeId 	INT 	NOT NULL 	AUTO_INCREMENT,
typeName		VARCHAR(255),

CONSTRAINT accountType_PK
	PRIMARY KEY (accountTypeId)
);


CREATE TABLE UserAccount (
userAccountId	INT				NOT NULL	AUTO_INCREMENT,
username		VARCHAR(255)	NOT NULL,
firstName		VARCHAR(255)	NOT NULL,
lastName		VARCHAR(255)	NOT NULL,

CONSTRAINT userAccount_PK 
	PRIMARY KEY (userAccountId),
	
CONSTRAINT username_Unique
	UNIQUE (username)
);


CREATE TABLE BankAccount (
bankAccountId 	INT 	NOT NULL 	AUTO_INCREMENT,
accountName		VARCHAR(255),
balance			FLOAT,
accountTypeId	INT 	NOT NULL,
bankId			INT 	NOT NULL,
userAccountId	INT		NOT NULL,

CONSTRAINT bankAccount_PK
	PRIMARY KEY (bankAccountId),
	
CONSTRAINT bankAccount_accountType_FK
	FOREIGN KEY (accountTypeId)
		REFERENCES AccountType(accountTypeId),
		
CONSTRAINT bankAccount_bank_FK
	FOREIGN KEY (bankId)
		REFERENCES Bank(bankId),
		
CONSTRAINT bankAccount_userAccount_FK
	FOREIGN KEY (userAccountId)
		REFERENCES UserAccount(userAccountId)
);


CREATE TABLE TransactionCategory (
transactionCategoryId 	INT 	NOT NULL 	AUTO_INCREMENT,
categoryName			VARCHAR(255),

CONSTRAINT transactionCategory_PK
	PRIMARY KEY (transactionCategoryId)
);


CREATE TABLE FinancialTransaction (
financialTransactionId 	INT 	NOT NULL 	AUTO_INCREMENT,
transactionTitle 		VARCHAR(255),
amount 					FLOAT 	NOT NULL,
transactionComment 		VARCHAR(255),
datePosted 				DATE	NOT NULL,
transactionCategoryId 	INT 	NOT NULL,
bankAccountId 			INT 	NOT NULL,

CONSTRAINT financialTransactionId_PK
	PRIMARY KEY (financialTransactionId),
	
CONSTRAINT financeTransaction_transactionCategory_FK
	FOREIGN KEY (transactionCategoryId)
		REFERENCES TransactionCategory(transactionCategoryId),
		
CONSTRAINT financeTransaction_bankAccount_FK
	FOREIGN KEY (bankAccountId)
		REFERENCES BankAccount(bankAccountId)
);


CREATE TRIGGER insert_transaction 
AFTER INSERT ON FinancialTransaction
FOR EACH ROW
	UPDATE BankAccount 
	SET balance = balance + NEW.amount
	WHERE bankAccountId = NEW.bankAccountId;
	
	
DELIMITER //
CREATE TRIGGER update_transaction
BEFORE UPDATE ON FinancialTransaction 
FOR EACH ROW

BEGIN

	-- Bank account ID was not changed
	IF OLD.bankAccountId = NEW.bankAccountId THEN
		UPDATE BankAccount
		SET balance = balance - OLD.amount + NEW.amount
		WHERE bankAccountId = OLD.bankAccountId;
	
	-- Bank account ID was changed
	ELSE
		-- Remove transaction amount from old account
		UPDATE BankAccount
		SET balance = balance - OLD.amount
		WHERE bankAccountId = OLD.bankAccountId;
		
		-- Add transaction amount to new account
		UPDATE BankAccount
		SET balance = balance + NEW.amount
		WHERE bankAccountId = NEW.bankAccountId;
	END IF;
END//
DELIMITER ;
	
	
CREATE TRIGGER delete_transaction
AFTER DELETE ON FinancialTransaction
FOR EACH ROW
	UPDATE BankAccount 
	SET balance = balance - OLD.amount
	WHERE bankAccountId = OLD.bankAccountId;
	
	



