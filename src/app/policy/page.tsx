import React from 'react'
import Image from 'next/image'

// text color  #002f34
// bg color 

export default function Policy() {
  return (
    <div className="min-h-screen bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
        <p className='text-2xl pb-5 pt-20 font-bold text-center'>Politika privatnosti</p>
            <Image
            src="/images/logo.png"
            alt='logo_image'
            height={50}
            width={50}
            unoptimized
            className='h-[15vh] object-cover mx-auto w-auto pb-5'
            />
          <p className='text-2xl pb-5 font-bold text-center'>PetConnect</p>

      
      <div className='w-full shadow-2xl bg-white rounded-xl p-5 min-h-[50vh]'>

      <p className='text-[#102644] text-justify'>Dobrodošli na našu web aplikaciju. Cijenimo vašu privatnost i želimo da se osjećate sigurno dok koristite naše 
        usluge. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, dijelimo i štitimo vaše osobne podatke.

        <br /> <br />

        <span className='py-5 font-bold text-2xl'>Prikupljanje podataka</span> <br /> <br />
        Prikupljamo osobne podatke koje nam dobrovoljno pružate kada koristite našu web aplikaciju. To uključuje:
                <br /> <br />
            <ul className='list-disc ml-5'>
                <li>Korisničko ime</li>
                <li>Email adresa</li>
                <li>Broj telefona</li>
            </ul>

            <br />

            Automatski prikupljamo određene podatke kada koristite našu web stranicu, kao što su:

            <br /> <br />

            <ul className='list-disc ml-5'>
                <li>IP adresa</li>
                <li>Tip preglednika i uređaja</li>
                <li>Vrijeme provedeno na stranici</li>
            </ul>

            <br />

            <span className='text-2xl font-bold'>Upotreba Podataka</span> <br />
            Vaše osobne podatke koristimo za sljedeće svrhe:
            <br /> <br />
            <ul className='list-disc ml-5'>
                <li>Pružanje i poboljšanje naše aplikacije</li>
                <li>Komunikacija s Vama</li>
                <li>Poboljšanje korisničkog iskustva</li>
                <li>Analiziranje upotrebe naše web aplikacije</li>
                <li>Sigurnosne svrhe</li>
            </ul>

            <br /> <br />

            <span className='text-2xl font-bold py-5'>Dijeljenje podataka</span> 
            <br /> <br />

            Vaše podatke nikada nećemo prodavati, iznajmljivati ili dijeliti sa trećim stranama. 
            Aplikacija nije zamišljena na taj način. Aplikacija je zamišljena da bude centralizirano rješenje 
            za generalnu pomoć svim životinjama i za sve obične korisnike će biti besplatna.

            <br /> <br />


            <span className='text-2xl font-bold'>Sigurnost podataka</span>
            <br />  <br />

            Naš tim volontera konstantno preduzimaju mjere za zaštitu Vaših privatnih podataka od neovlaštenog pristupa,
            upotrebe ili otkrivanja. Iako ne postoji ni jedan 100% siguran sistem, mi smo poduzeli sve moguće mjere u našoj moći 
            da osiguramo Vaše podatke. U oglasima su dostupni samo brojevi telefona, ne mail adrese. Također šifre za Vaše profile
            su enkriptovane i sigurno smještene u bazu podataka. S obzirom da je aplikacija volonterskog karaktera, od Vas smo uzeli
            samo neophodne informacije zbog kreiranja korisničkih profila. U krajnjem slučaju sigurnosnog upada u sistem, Vaši podaci
            neće biti ugroženi jer nismo tražili od Vas osjetljive podatke {"kao što su: broj lične karte, jedinstveni matični broj itd..."}
            <br /> <br />
            <span className='text-2xl font-bold'>Vaša prava</span>

            <br /> <br />

            Imate pravo na prigovor na obradu podataka. Ako smatrate da ste na bilo koji način ugroženi
            ili ne želite koristiti našu platformu, molimo Vas da nas kontaktirate. U slučaju brisanja Vašeg korisničkog profila,
            svi podaci se automatski brišu istog momenta. Ništa ne skladištimo naknadno. Na Vaš mail doći će zvanična potvrda
            da ste raskinuli suradnju s nama i da su svi Vaši podaci uspješno obrisani.

            <br /> <br />

            <span className='text-2xl font-bold'>Ponašanje korisnika</span>

            <br /> <br />

            Očekujemo da svi korisnici naše web aplikacije poštuju osnovna pravila pristojnog i odgovornog ponašanja.U slučaju
            kršenja ovih pravila kao što su: 

            <br /> <br />
            <ul className='list-disc ml-5'>
                <li>Korištenje uvredljivog ili neprikladnog jezika</li>
                <li>Uznemiravanja drugih korisnika</li>
                <li>Postavljanje neprimjerenog sadržaja</li>
                <li>Kršenje bilo kojih drugih pravila ili smjernica naše zajednice</li>
            </ul>

            <br /> <br />

            zadržavamo pravo da Vam <span className='font-bold'>trajno zabranimo</span> pristup našoj web aplikaciji. 


      </p>
      </div>
    </div>
  )
}
