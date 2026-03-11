export class UpdatePeminjamanDto {
  studentId?: number;        
  bookId?: number;          
  status?: 'DIPINJAM' | 'DIKEMBALIKAN'; 
  tanggalPinjam?: Date;      
  tanggalKembali?: Date;    
}
