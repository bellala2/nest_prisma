export class CreatePeminjamanDto {
  studentId: number;       
  bookId: number;          
  tanggalPinjam?: Date;    
  status?: 'DIPINJAM' | 'DIKEMBALIKAN'; 
}
