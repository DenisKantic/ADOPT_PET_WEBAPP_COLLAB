import React from 'react'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <div className="min-h-[40svh] bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14 flex flex-col items-center">
      <p className="text-4xl pb-5 pt-5 font-bold text-center text-[#102644]">
        O nama
      </p>

      <div className="flex flex-col gap-10 w-full pb-5">
        <div className="w-full shadow-2xl bg-white rounded-xl p-5 min-h-[50vh] flex flex-col items-center justify-center">
          <Image
            src="/images/deni.jpg"
            height={50}
            width={50}
            alt="denis_picture"
            unoptimized
            className="object-contain mx-auto rounded-full w-auto h-[30svh]"
          />
          <p className="text-2xl">Denis Kantić</p>
          <span className="text-sm pt-2 text-gray-800">
            Kreator i osnivač Pet Connect
          </span>
          <p className="py-5 text-justify text-[#102644] w-[90%]">
            Platforma Pet Connect je nastala usljed velike potrebe za pomoć
            našim dragim ljubimcima. Svjedoci smo kako nam je teško snalaziti se
            po raznim facebook grupama i stranicama, instagram profilima i
            slično... Zbog toga volonter Denis Kantić iz Tuzle, nedavno
            diplomirani bachelor Tehničkog odgoja i informatike, na fakultetu
            Elektrotehnike u Tuzli je odlučio uzeti stvar u svoje ruke.
            Iskoristio je svoje iskustvo u web programiranju i napravio je prvu
            online web platformu za udomljavanje i pružanje pomoći SVIM
            životinjama, na području čitave Bosne i Hercegovine. <br />
            Pet Connect je zamišljena kao centralizirano rješenje za sve naše
            ljubimce. Aplikacija će pružati oglase različitog tipa kao što su:{' '}
            <br />
          </p>
          <ol className="list-disc w-[90%]">
            <li>Oglasi za udomljavanje</li>
            <li>Oglasi za objavu izgubljene životinje</li>
            <li>
              Donacijski oglasi, gdje možete izabrati jednu od ponuđene tri
              kategorije: hrana, oprema i ostalo
            </li>
          </ol>
          <span className="w-[90%]">
            <br /> <br />
            Osim oglasa, aplikacija će sadržavati listu svih veterinarskih
            stanica u Bosni i Hercegovini. Također će imati listu svih aktivnih
            udruženja koje se bave za dobrobit životinja i njihovu sigurnost,
            azila i slično. PetConnect će također preko svog bloga pružati i
            korisne informacije. <br /> Ovakav tip aplikacije ne postoji na
            prostoru Balkana. Zbog toga je ovo ujedno jako dobra reklama za našu
            državu kao i dokaz stručnosti mladih ljudi u našoj zemlji.
            <br />
            <br />
            PetConnect će se konstantno razvijati i nuditi više opcija a sve za
            naše drage ljubimce. U planu je ubaciti i prijevod kako bi omogućili
            i strancima da lakše koriste našu aplikaciju a koji su također
            potencijalni udomitelji.
            <br />
            Naporno se radi i na ostalim opcijama kao što su opcije za
            slabovidne osobe. Trenutno aplikacija nema interni chat odnosno
            sistem za poruke, jer je ovaj projekat nastao potpuno volonterski.
            Volonter Denis Kantić mjesečno financira server, nadgleda i
            kontroliše čitavu aplikaciju. Zbog većih finacijskih troškova za
            takvu opciju, nije u mogućnosti pružiti trenutno takvu funkciju. U
            slučaju veće donacije, naravno da će se odmah uložiti u
            infrastrukturu aplikacije kako bi se poboljšala što više moguće.{' '}
            <br /> <br />
            <span className="font-bold uppercase text-xl">
              Sve novčane donacije koje nam uplatite za troškove servera i
              održavanja aplikacije, veći dio novca će se donirati na mjesečnom
              nivou azilima kao i regulisanju otvorenih računa u veterinarskim
              stanicama za životinje lutalice. Svaka donacija će se zabilježiti
              i objaviti na našem blogu.
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
