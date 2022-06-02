use qlKH
go

create trigger trg_DanhGiaKH
on ThamGiaBuoiHoc for insert, update
as
begin
	if update(DanhGiaBuoiHoc)
	begin
		declare @KH as varchar(10) = (select MaKH from inserted)
		declare @DG as float = (select AVG(DanhGiaBuoiHoc) from ThamGiaBuoiHoc group by MaKH having MaKH = @KH)
		update KhoaHoc
		set DanhGiaKH = @DG where MaKH = @KH
	end
end
go

create trigger trg_DanhGiaGV
on KhoaHoc for insert, update
as
begin
	if update(DanhGiaKH)
	begin
		declare @KH as varchar(10) = (select MaGV from inserted)
		declare @DG as float = (select AVG(DanhGiaKH) from KhoaHoc group by MaKH having MaKH = @KH)
		update GiaoVien
		set DanhGiaGV = @DG where MaGV = (select MaGV from inserted)
	end
end
go
