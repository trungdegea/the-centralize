USE qlKH
GO

CREATE
--ALTER
PROC sp_GV_TaoKH 
	@MaTK varchar(10),
	@TenKH nvarchar(50), 
	@Lop int, 
	@SoBuoi int, 
	@SoHS int,
	@HocPhi int
AS
BEGIN TRAN
	BEGIN TRY
		if not exists (select * from GiaoVien where MaTK = @MaTK)
		begin
			raiserror(N'Bạn chưa đăng ký làm Giáo Viên, không thể tạo Khóa Học', 16, 1)
			rollback tran
		end
		declare @MaGV as varchar(10) = (select MaGV from GiaoVien where MaTK = @MaTK)
		declare @MaKH as varchar(10) = dbo.f_Auto_MaKH()
		insert into KhoaHoc(MaKH, TenKhoaHoc, Lop, SoBuoiDuKien, SoHocSinhToiThieu, MaGV, HocPhi) 
		values (@MaKH, @TenKH, @Lop, @SoBuoi, @SoHS, @MaGV, @HocPhi)

	END TRY
	BEGIN CATCH
		SELECT  ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity, 
				ERROR_STATE() AS ErrorState,  
				ERROR_PROCEDURE() AS ErrorProcedure,  
				ERROR_LINE() AS ErrorLine,  
				ERROR_MESSAGE() AS ErrorMessage; 
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

GO

CREATE
--ALTER
PROC sp_TK_ThamGiaKH 
	@MaTK varchar(10),
	@MaKH varchar(10) 
AS
BEGIN TRAN
	BEGIN TRY
		declare @MaGV as varchar(10) = (select MaGV from KhoaHoc where MaKH = @MaKH)
		if exists (select * from GiaoVien where MaTK = @MaTK)
			if (select MaGV from GiaoVien where MaTK = @MaTK) = @MaGV
				raiserror(N'Không thể tự tham gia khóa học của mình',16,1)
		if exists (select * from ThamGiaKH where MaTK = @MaTK and MaKH = @MaKH)
			raiserror(N'Không thể tham gia khoá học đã tham gia rồi',16,1)
		insert into ThamGiaKH(MaKH, MaTK, NgayThamGia, TinhTrangThanhToan)
		values(@MaKH, @MaTK, getdate(), N'Chưa Thanh Toán')
	END TRY
	BEGIN CATCH
		SELECT  ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity, 
				ERROR_STATE() AS ErrorState,  
				ERROR_PROCEDURE() AS ErrorProcedure,  
				ERROR_LINE() AS ErrorLine,  
				ERROR_MESSAGE() AS ErrorMessage; 
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

GO

CREATE
--ALTER
PROC sp_TK_ThanhToan
	@MaTK varchar(10),
	@MaKH varchar(10),
	@TinhTrang bit
AS
BEGIN TRAN
	BEGIN TRY
		IF @TinhTrang = 1
			UPDATE ThamGiaKH
			SET TinhTrangThanhToan = N'Đã Thanh Toán' where MaKH = @MaKH and MaTK = @MaTK
		ELSE UPDATE ThamGiaKH
			SET TinhTrangThanhToan = N'Chưa Thanh Toán'	 where MaKH = @MaKH and MaTK = @MaTK
	END TRY
	BEGIN CATCH
		SELECT  ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity, 
				ERROR_STATE() AS ErrorState,  
				ERROR_PROCEDURE() AS ErrorProcedure,  
				ERROR_LINE() AS ErrorLine,  
				ERROR_MESSAGE() AS ErrorMessage; 
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

GO

create 
--alter
proc sp_TK_CapNhatBC
	@MaTK varchar(10),
	@TenBang nvarchar(50),
	@NgayCapBang date,
	@NoiCapBang nvarchar(50)
AS
BEGIN TRAN
	BEGIN TRY
		declare @MaGV as varchar(10)
		if(not exists (select * from GiaoVien where MaTK = @MaTK))
		begin
			set @MaGV = dbo.f_Auto_MaGV()
			insert into GiaoVien(MaGV, MaTK) values (@MaGV, @MaTK)
		end	
		else set @MaGV = (select MaGV from GiaoVien where MaTK = @MaTK)
		declare @STT as int = (select count(*) from BangCap where MaGV = @MaGV) + 1
		insert into BangCap(MaGV, STT, NgayCap, NoiCap, TenBang) 
		values(@MaGV, @STT, @NgayCapBang, @NoiCapBang, @TenBang)
	END TRY
	BEGIN CATCH
		SELECT  ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity, 
				ERROR_STATE() AS ErrorState,  
				ERROR_PROCEDURE() AS ErrorProcedure,  
				ERROR_LINE() AS ErrorLine,  
				ERROR_MESSAGE() AS ErrorMessage; 
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

GO

CREATE 
--alter
PROC sp_GV_HuyKH
	@MaGV varchar(10),
	@MaKH varchar(10)
AS
BEGIN TRAN
	BEGIN TRY
		declare @Ngay as date = getdate()
		declare @NgayBD as date = (select Ngay from LichHoc where MaKH = @MaKH and STT = 1)
		if DATEDIFF(wk, @Ngay, @NgayBD) < 2 
		begin
			raiserror(N'Không thể hủy Khóa Học bắt đầu trong 3 ngày', 16, 1)
			rollback tran
		end
		else
		begin	
			delete from ThamGiaBuoiHoc where MaKH = @MaKH
			delete from ThamGiaKH where MaKH = @MaKH
			delete from KhoaHoc where MaKH = @MaKH
		end
	END TRY
	BEGIN CATCH
		SELECT  ERROR_NUMBER() AS ErrorNumber,
				ERROR_SEVERITY() AS ErrorSeverity, 
				ERROR_STATE() AS ErrorState,  
				ERROR_PROCEDURE() AS ErrorProcedure,  
				ERROR_LINE() AS ErrorLine,  
				ERROR_MESSAGE() AS ErrorMessage; 
		IF @@TRANCOUNT > 0  
			ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

GO
	--Tạo tài khoản
CREATE 
--ALTER
PROC sp_signUp
	@tendn VARCHAR(50), 
	@mk VARCHAR(50),
	@hoten NVARCHAR(50), 
	@ngaysinh DATE, 
	@email VARCHAR(50), 
	@sdt VARCHAR(20)
AS
  BEGIN TRAN
  BEGIN TRY
    IF EXISTS (SELECT *
        FROM nguoidung
        WHERE tendn = @tendn)
      RAISERROR (N'Tên đăng nhập đã tồn tại', 16, 1)
    ELSE
      DECLARE @matk VARCHAR(10)
    set @matk=dbo.f_Auto_MaTK()
    INSERT INTO NGUOIDUNG
      VALUES (@matk, @tendn, @mk, @hoten, @ngaysinh, @email, @sdt)

  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
  IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO


--Đăng nhập
CREATE 
--ALTER
PROC sp_signIn @tendn VARCHAR(50), @mk VARCHAR(50), @matk VARCHAR(10) OUTPUT
AS
BEGIN TRAN
	BEGIN TRY
		SELECT @matk = (SELECT MaTK
			FROM nguoidung
			WHERE tendn = @tendn
			AND matkhaudn = @mk)
		IF @matk IS NULL
		  RAISERROR (N'Sai tài khoản hoặc mật khẩu', 16, 1)
		select ND.MaTK, MaGV from NguoiDung ND left join GiaoVien GV on ND.MaTK = GV.MaTK where ND.MaTK = @matk
  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
  IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO


--Tìm khóa học - 19120674
CREATE 
--ALTER
PROC sp_findCourses @keyword NVARCHAR(50)
AS
  BEGIN TRAN
  BEGIN TRY
    SELECT
      *
    FROM KhoaHoc
    WHERE TenKhoaHoc LIKE '%' + @keyword + '%'
  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
  IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO


--Đánh giá buổi học - 19120674
CREATE
--ALTER
PROC sp_rateLesson @matk VARCHAR(10), @makh VARCHAR(10), @stt INT, @rate FLOAT
AS
  BEGIN TRAN
  BEGIN TRY
    UPDATE ThamGiaKH
    SET DanhGia = @rate
    WHERE @matk = matk
    AND @makh = makh

  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
  IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO

create 
--alter
proc sp_GV_XemKH @MaTK varchar(10)
AS
  BEGIN TRAN
  BEGIN TRY
  declare @MaGV  as varchar(10) = (SELECT MaGV FROM GiaoVien WHERE MaTK = @MaTK)
  select * from KhoaHoc where MaGV = @MaGV
  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
  IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO

CREATE 
--ALTER
PROC sp_ND_CapNhatTT
	@MaTK VARCHAR(10),
	@HoTen NVARCHAR(50), 
	@NgaySinh DATE, 
	@Email VARCHAR(50), 
	@SDT VARCHAR(20)
AS
BEGIN TRAN
	BEGIN TRY
		update NguoiDung
		set HoTen=@HoTen where MaTK=@MaTK
		update NguoiDung
		set NgaySinh=@NgaySinh where MaTK=@MaTK
		update NguoiDung
		set Email=@Email where MaTK=@MaTK
		update NguoiDung
		set SDT=@SDT where MaTK=@MaTK
	END TRY
	BEGIN CATCH
	SELECT
		  ERROR_NUMBER() AS ErrorNumber
		 ,ERROR_SEVERITY() AS ErrorSeverity
		 ,ERROR_STATE() AS ErrorState
		 ,ERROR_PROCEDURE() AS ErrorProcedure
		 ,ERROR_LINE() AS ErrorLine
		 ,ERROR_MESSAGE() AS ErrorMessage;
		IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
IF @@TRANCOUNT > 0
   COMMIT TRANSACTION;

GO

--drop proc sp_User_XemKH
create 
--alter
proc sp_User_XemKH @MaTK varchar(10)
AS
BEGIN TRAN
	BEGIN TRY
	  select kh.* from ThamGiaKH tg Join KhoaHoc kh on tg.MaKH=kh.MaKH  where @MaTK=MaTK
	END TRY
	BEGIN CATCH
		SELECT
			  ERROR_NUMBER() AS ErrorNumber
			 ,ERROR_SEVERITY() AS ErrorSeverity
			 ,ERROR_STATE() AS ErrorState
			 ,ERROR_PROCEDURE() AS ErrorProcedure
			 ,ERROR_LINE() AS ErrorLine
			 ,ERROR_MESSAGE() AS ErrorMessage;
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION
	END CATCH
IF @@TRANCOUNT > 0
	COMMIT TRANSACTION;
GO

create 
--alter
proc sp_GV_XemBC @MaTK varchar(10)
AS
BEGIN TRAN
  BEGIN TRY
	  declare @MaGV  as varchar(10) = (SELECT MaGV FROM GiaoVien WHERE MaTK=@MaTK)
	  select * from BangCap where @MaGV=MaGV
  END TRY
  BEGIN CATCH
    SELECT
      ERROR_NUMBER() AS ErrorNumber
     ,ERROR_SEVERITY() AS ErrorSeverity
     ,ERROR_STATE() AS ErrorState
     ,ERROR_PROCEDURE() AS ErrorProcedure
     ,ERROR_LINE() AS ErrorLine
     ,ERROR_MESSAGE() AS ErrorMessage;
    IF @@TRANCOUNT > 0
      ROLLBACK TRANSACTION
  END CATCH
IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO
