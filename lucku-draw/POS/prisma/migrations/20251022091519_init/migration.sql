BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Transaction] (
    [id] INT NOT NULL IDENTITY(1,1),
    [transactionId] INT NOT NULL,
    [couponNo] NVARCHAR(1000),
    [couponId] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Transaction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Transaction_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Transaction_transactionId_key] UNIQUE NONCLUSTERED ([transactionId])
);

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [transactionId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Customer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Customer_transactionId_key] UNIQUE NONCLUSTERED ([transactionId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [Customer_transactionId_fkey] FOREIGN KEY ([transactionId]) REFERENCES [dbo].[Transaction]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
