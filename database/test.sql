use qlKH

exec sp_signUp 'Kuro', '123','Lê Nam Thái Sơn' ,'2001-11-11', 'email@gmail.com', '0123456789'
exec sp_signIn 'Kuro', '123'
exec sp_ND_CapNhatTT 'TK00000020', N'Phạm Tân Tị', '2022-11-11', 'email@gmail.com', '0123456789'
exec sp_TK_CapNhatBC 'TK00000020', N'Bằng Sư Phạm', '2018-12-04', 'TP. HCM'
exec sp_GV_TaoKH 'TK00000020', N'Khóa Học', 12, 15, 10, 1000000
exec sp_GV_XemKH 'TK00000020'
exec sp_GV_LenLich 'KH00000015', '2022-02-19', '7:30', 'Bài 1'
exec sp_GV_LenLich 'KH00000015', '2022-02-24', '7:30', 'Bài 2'
exec sp_GV_LenLich 'KH00000015', '2022-03-01', '7:30', 'Bài 3'
exec sp_GV_LenLich 'KH00000015', '2022-03-09', '7:30', 'Bài 4'
exec sp_GV_XemLH 'TK00000020'
exec sp_GV_SuaLich 'KH00000015',4 ,'2022-03-16','7:30'
exec sp_GV_HuyKH 'GV00000010', 'KH00000015'


exec sp_signUp 'Kuro1', '123','Lê Nam Thái Sơn' ,'2001-11-11', 'email@gmail.com', '0123456789'
exec sp_findCourses ''
exec sp_TK_ThamGiaKH 'TK00000021', 'KH00000015'
exec sp_User_XemKH 'TK00000021'
exec sp_User_XemLH 'TK00000021', 'KH00000015'
exec sp_joinLesson 'TK00000021', 'KH00000015', 1
exec sp_rateLesson 'TK00000021', 'KH00000015', 1, 9.5
exec sp_TK_ThanhToan 'TK00000021', 'KH00000015', 1

