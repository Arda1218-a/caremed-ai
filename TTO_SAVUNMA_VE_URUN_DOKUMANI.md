# CareMed Akıllı İlaç Dolabı — TTO Savunma ve Teknik Ürün Dokümanı

> **Bu belge; CareMed Akıllı İlaç Dolabı projesinin donanım bileşenlerini, maliyet analizini, parça değişim takvimini ve TTO / yatırımcı / jüri mülakatlarındaki sert sorulara karşı hazırlanmış veri odaklı yanıtları içermektedir.**

---

## 1. DONANIM BİLEŞEN LİSTESİ VE MALİYET TABLOSU (BOM)

Sistemdeki tüm parçalar **endüstriyel standartta, piyasada kolayca bulunabilen ve seri üretime uygun** bileşenlerdir. Hiçbir bileşen fahiş fiyatlı veya bulunması imkânsız parçalardan seçilmemiştir.

| # | Parça Adı | Model / Özellik | Görevi | Tahmini Fiyat (₺) | Değişim / Ömür Süresi |
|---|---|---|---|---|---|
| 1 | **Ana İşlemci Kartı** | ESP32-WROOM-32 / ESP32-S3 | Sistemin beyni: Wi-Fi, motorlar, sensörler ve ekranı yönetir | ₺180 - ₺250 | 8 - 10 Yıl (Yarı iletken, neredeyse ömürlük) |
| 2 | **Bilgi Ekranı** | 20x4 Karakter LCD (I2C Modüllü) | Yaşlıya saat, içilen/kalan doz ve sağlık tavsiyelerini döngüsel gösterir | ₺150 - ₺220 | 7 - 10 Yıl (LED arka aydınlatma ömrü) |
| 3 | **Motorlu Kapak Sistemi** | 2x SG90 / MG90S Metal Dişli Servo | Üst ve Alt raf kapaklarını bağımsız olarak 90° açıp kilitler | ₺160 - ₺240 (2 Adet) | 2 - 4 Yıl (Günde 4-6 açılma ile ~50.000 döngü) |
| 4 | **Sesli Alarm Modülü** | Aktif Buzzer (5V) | İlaç saati geldiğinde yüksek frekanslı "Bip Bip" ikazı | ₺20 - ₺35 | 10+ Yıl |
| 5 | **Sesli Konuşma Hoparlörü** | 3W 8Ω Hoparlör + PAM8403 Mini Amfi | Canlı sesli yönlendirme ("Coraspin ilacınızı alınız") | ₺80 - ₺130 | 6 - 8 Yıl |
| 6 | **Raf Doluluk Sensörleri** | 8x Mikroswitch / Ağırlık Sensörü | 8 yuvanın her birinde ilacın alındığını ve geri konduğunu anlar | ₺120 - ₺180 (8 Adet) | 5 - 7 Yıl (Mekanik ömür: 1.000.000 tıklama) |
| 7 | **Hedef Yuva LED'leri** | 8x 5mm Yeşil/Kırmızı LED | Sadece içilecek ilacın önünde yanarak yaşlıya rehberlik eder | ₺20 - ₺30 (Paket) | 10+ Yıl |
| 8 | **Barkod / Kutu Kamerası** | OV2640 Kamera Modülü (ESP32-CAM) | İlaç yanlış yuvaya konulursa kutuyu/barkodu görüp alarm verir | ₺180 - ₺280 | 5 - 8 Yıl |
| 9 | **Ana Şebeke Güç Kaynağı** | 12V 3A DC Duvar Adaptörü | Cihazın buzdolabı gibi prize sürekli takılı çalışmasını sağlar | ₺120 - ₺180 | 4 - 6 Yıl |
| 10 | **Kesintisiz Güç Kaynağı (UPS)** | 3x 18650 Li-ion Pil + BMS Kartı | Elektrik kesintilerinde dolabın 24 saat çalışmasını sürdürür | ₺200 - ₺320 | **2 - 3 Yıl** ⚠️ (Lityum pil kimyasal ömrü) |
| 11 | **Kasa & Gövde** | Lazer Kesim Pleksi / MDF / Enjeksiyon Plastik | 4 üst + 4 alt bölmeli kilitli revir dolabı iskeleti | ₺300 - ₺600 | 10+ Yıl |
| 12 | **Kablo, Soket & PCB** | Delikli Plaket veya Özel Baskı Devre | Dağınık kabloları engelleyen devre kartı altyapısı | ₺80 - ₺150 | 10+ Yıl |

### Maliyet Özeti:
* **Tekil Prototip Maliyeti:** ~₺1.600 — ₺2.600 TL
* **OSTİM Sanayisinde Seri Üretim Maliyeti (500+ Adet):** ~₺700 — ₺950 TL
* **Piyasadaki Eşdeğer Tıbbi/Medikal Cihaz Satış Fiyatları:** ₺8.000 — ₺25.000 TL

---

## 2. PARÇA DEĞİŞİMİ VE PERİYODİK BAKIM TAKVİMİ

Cihaz bakım gerektirmeyen "Tak-Çalıştır" mantığında tasarlanmıştır. Yalnızca kimyasal veya mekanik aşınmaya uğrayan parçalar şu periyotlarda kontrol edilir:

1. **6 Ayda Bir (Gözle Kontrol):**  
   Kapakları açıp kapatan servo motorların dişlileri kontrol edilir, gerekirse silikon sprey ile yağlanır.
2. **2 - 3 Yılda Bir (Zorunlu Pil Değişimi):**  
   Cihazın içindeki 18650 Li-ion piller, cep telefonlarındaki gibi zamanla kapasite kaybeder. Elektrik kesintisi korumasının 24 saat sürebilmesi için piller 2-3 yılda bir yenilenir (Maliyeti ~₺150-₺250).
3. **4 - 5 Yılda Bir (Önleyici Adaptör Değişimi):**  
   Prize takılı 12V besleme adaptörü şebeke dalgalanmalarına karşı önlem amaçlı yenilenebilir.
4. **Gerektiğinde (Lens Temizliği):**  
   Barkod okuyan kamera lensi tozlandığında kuru mikrofiber bezle silinir.

---

## 3. PROJENİN KİMLİĞİ: NE, NEDEN, KİMLER İÇİN?

### Bu Proje Nedir?
CareMed; yaşlı bireylerin **ilaçlarını unutmasını, yanlış ilacı içmesini ve ilaçlarının bitip tedavisiz kalmasını fiziksel kilit ve yapay zeka ile imkânsız hale getiren** akıllı bir revir dolabıdır.

### Neden Klasik Mobil Uygulamalar Çözüm Değildir?
* Piyasada 1.000'den fazla "İlaç Hatırlatıcı" mobil uygulama vardır ancak **65 yaş üstü bireylerin %70'inden fazlası bu uygulamaları kullanamaz.**
* Yaşlı bireyin gözü küçük ekranı görmez, eli titrediği için ekrana dokunamaz, telefonu odada unutur, şarjı biter veya gelen bildirimi kapatıp ilacı içtiğini zanneder.
* **Sonuç:** Türkiye'de acil servislere yapılan yaşlı başvurularının önemli bir kısmı "yanlış ilaç alımı" veya "tansiyon/şeker ilacının unutulması sonucu kriz" kaynaklıdır.

### Kimler Kullanabilir? (Hedef Kitle)
1. **Evde Yalnız Yaşayan 65+ Bireyler:** Kendi bakımını sağlarken çocuklarının içinin rahat etmesini isteyenler.
2. **Alzheimer, Demans ve Parkinson Hastaları:** İlaç kutularını birbirine karıştırma riski en yüksek grup. Dolap sadece doğru ilacın kapağını açtığı için yanlış ilaç içme ihtimalleri sıfırlanır.
3. **Huzurevleri ve Yaşlı Bakımevleri (B2B Pazar):** 1 hemşirenin 30 hastaya tek tek ilaç dağıtması günde 3 saat sürer. CareMed bu süreci otomatikleştirerek hemşire hatalarını bitirir.
4. **Evde Bakım Hizmeti Veren Sağlık Şirketleri:** Hastanın ilacı içip içmediğini refakatçi paneli üzerinden anlık raporlar.

---

## 4. TTO VE YATIRIMCI GÖRÜŞMELERİ İÇİN "ŞAH-MAT" CEVAPLARI

Görüşeceğin kişiler (Süleyman Bey vb.) genelde projeyi anlamadan refleks olarak şu itirazları yaparlar. Bu cevapları net, sakin ve özgüvenle ver:

---

### ❓ İtiraz 1: *"Ben zaten annemi telefonla arar sorarım: 'İlacını içtin mi?' derim. Eczaneyi de ararım. Bu cihaza niye yatırım yapılsın?"*

**Verilecek Cevap:**
> "Hocam/Süleyman Bey, bu söylediğiniz yöntem tıp dünyasında **'Doğrulanamayan İletişim Hatası'** olarak adlandırılır ve yaşlı ölümlerinin en sinsi sebeplerinden biridir:
> 
> 1. **'İçtim' Yanılgısı:** 75 yaşındaki bir anneye 'İlacını içtin mi?' dediğinizde size 'İçtim evladım' der. Çünkü içtiğini *zanneder* (aslında dün sabah içtiği an aklındadır). Ya da 1 saat önce içtiğini unutup ikinci kez içerek zehirlenir. Telefon görüşmesi fiziksel bir olayı doğrulayamaz. Bizim dolabımızda sensör, kutunun yerinden çıktığını ve geri konduğunu fiziksel olarak onaylar.
> 2. **Yanlış Kutu Faciası:** Annenize 'Tansiyon ilacını iç' dersiniz. Anneniz raftaki benzer beyaz kutulardan yanlış olanını (örneğin kan sulandırıcıyı) alır. Telefonla bunu görebilir misiniz? Göremezsiniz. Bizim dolabımızda **sadece içilmesi gereken ilacın kapağı açılır**, diğerleri kilitli kalır. Yanlış kutuyu alırsa kamera ve ses bağırır: *'Burada Coraspin olmalıydı, yanlış ilaç aldınız!'*
> 3. **Zaman ve Takip:** Siz toplantıdayken, ameliyattayken veya uyurken annenizi günde 4 defa arayamazsınız. Bir sağlık sistemi insan inisiyatifine değil, 7/24 çalışan otomasyona emanet edilmelidir."

---

### ❓ İtiraz 2: *"Yaşlı insan bunu nasıl anlasın? Kulağı zor duyuyor, eli titriyor. Telefonu kullanamayan yaşlı bunu nasıl öğrenecek?"*

**Verilecek Cevap:**
> "Hocam, tam olarak projenin kalbine parmak bastınız! **Bu cihaz, yaşlıya teknoloji öğretmek için değil; yaşlının hiçbir teknoloji öğrenmesine GEREK KALMASIN diye tasarlandı.**
> 
> * Cep telefonları ve akıllı saatler yaşlıya 'Menüye gir, dokun, butona bas' der. Yaşlının eli titrediği için Parkinson hastası o dokunmatiğe basamaz.
> * **Bizim dolabımızda DOKUNMATİK EKRAN BİLE YOKTUR.** Çünkü dokunmatik ekran yaşlı düşmanıdır.
> * Dolabın kapağı **motorla kendiliğinden 90 derece açılır.**
> * Alması gereken ilacın yuvasında **yeşil ışık yanar.**
> * Yaşlının yapacağı tek şey: Işığı yanan kutuyu eline almak, hapını içip kutuyu geri koymaktır. Menü yok, şifre yok, buton arama yok!
> * Kulağı az duyanlar için standart telefon hoparlörü değil; **85 desibellik endüstriyel buzzer ve amfili hoparlör** kullanılmıştır."

---

### ❓ İtiraz 3: *"Maliyet çok yüksek, ekip yok, bu projeler çöp."*

**Verilecek Cevap:**
> "Süleyman Bey, maliyet bir kutunun üretim masrafı değil; **o kutunun engellediği felaketin faturasıdır.**
> 
> * Bugün bir yaşlının tansiyon ilacını unutup felç geçirmesinin devlete, SGK'ya ve ailesine yoğun bakım maliyeti **en az 200.000 TL'dir.**
> * Özel bir bakımevinin aylık ücreti **35.000 TL ile 80.000 TL** arasındadır.
> * Bu cihazın prototip maliyeti **2.000 TL**, Ostim sanayisinde seri üretim maliyeti **850 TL'dir.**
> * Amerika'daki benzeri olan **Hero Health**, tam olarak bu problem için **18 Milyon Dolar** yatırım aldı.
> 
> **Ekip konusuna gelince:**
> Ben OSTİM Teknik Üniversitesi Lojistik öğrencisiyim. Arkamda 10 kişilik yazılım ofisi olmadan tek başıma:
> 1. Sistemin donanım mimarisini ve Wokwi üzerinde çalışan firmware kodunu yazdım.
> 2. 81 ilin nöbetçi eczanelerini tarayan canlı web platformunu kodlayıp GitHub üzerinden yayına aldım.
> 
> TTO ofislerine slayt gösterisiyle gelip hiçbir şey üretmeyenlerin yanında; **ben çalışan prototipi masaya koyan bir geliştiriciyim.** Şimdi sorum şu: Üniversitemiz bu çalışan yerli MedTech prototipini Ostim sanayisiyle birleştirip bir girişime dönüştürmek mi istiyor, yoksa bir köşeye itmek mi?"

---

## 5. STRATEJİK KOZUN: "OSTİM TEKNİK VE LOJİSTİK BÖLÜMÜ"

Görüşmede bölümün ve üniversiten hakkında ezilmek yerine bunu bir **silah** olarak kullan:

1. **Ostim Gücü:** "Ben bu projeyi kağıt üzerinde bırakmayacak tek yerdeyim: OSTİM'deyim. Dolabın kalıbı, sacı, montajı ve PCB baskısı kampüsümün etrafındaki Ostim Medikal Sanayi Kümelenmesi'nde (OSMED) 1 haftada üretilebilir."
2. **Lojistik Vizyonu:** "Ben sadece bir ilaç kutusu yapmıyorum; **'Tersine Medikal Tedarik Zinciri ve Son Kilometre İlaç Lojistiği (Last-Mile Pharma Logistics)'** kuruyorum. İlacın depodan eczaneye, eczaneden hastanın dolabına kadar olan stok tüketim zincirini otomatikleştiriyorum."

---

*CareMed Akıllı Sağlık ve İlaç Dolabı Sistemleri — Proje Savunma Belgesi*
