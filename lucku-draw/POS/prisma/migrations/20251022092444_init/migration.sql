BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Customer] DROP CONSTRAINT [Customer_transactionId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [Customer_transactionId_fkey] FOREIGN KEY ([transactionId]) REFERENCES [dbo].[Transaction]([transactionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
