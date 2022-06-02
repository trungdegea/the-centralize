use qlKH
go

create function f_Auto_MaTK() 
returns varchar(10)
AS
begin
	declare @MaTK as varchar(10) ='00000001'
	while(exists(SELECT *
				FROM NguoiDung
				WHERE MaTK = 'TK' + @MaTK))
		BEGIN
			SET @MaTK = @MaTK + 1
			SET @MaTK = REPLICATE('0', 8 - LEN(RTRIM(CONVERT(nvarchar(10), @MaTK)))) + CONVERT(nvarchar(10), @MaTK)
		END
	set @MaTK = 'TK' + @MaTK
	return @MaTK
end

GO

create function f_Auto_MaKH() 
returns varchar(10)
AS
begin
	declare @MaKH as varchar(10) ='00000001'
	while(exists(SELECT *
				FROM KhoaHoc
				WHERE MaKH = 'KH' + @MaKH))
		BEGIN
			SET @MaKH = @MaKH + 1
			SET @MaKH = REPLICATE('0', 8 - LEN(RTRIM(CONVERT(nvarchar(10), @MaKH)))) + CONVERT(nvarchar(10), @MaKH)
		END
	set @MaKH = 'KH' + @MaKH
	return @MaKH
end

GO

create function f_Auto_MaGV() 
returns varchar(10)
AS
begin
	declare @MaGV as varchar(10) ='00000001'
	while(exists(SELECT *
				FROM GiaoVien
				WHERE MaGV = 'GV'+ @MaGV))
		BEGIN
			SET @MaGV = @MaGV + 1
			SET @MaGV = REPLICATE('0', 8 - LEN(RTRIM(CONVERT(nvarchar(10), @MaGV)))) + CONVERT(nvarchar(10), @MaGV)
		END
	set @MaGV = 'GV' + @MaGV
	return @MaGV
end