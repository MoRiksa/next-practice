export interface MenuDataTypes {
  id_menu: string;
  nama_menu: string;
  harga: number;
  id_kategori: number;
}
export const dummyMenu: MenuDataTypes[] = Array(50)
  .fill(0)
  .map((v, i) => ({
    id_menu: `M00${i + 1}`,
    nama_menu: `Menu ${i + 1}`,
    harga: (i + 1) * 1000,
    id_kategori: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
  }));
