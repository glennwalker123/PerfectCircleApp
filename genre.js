(function () {
  'use strict';

  // ====================================================================
  //  Content. Every chapter is a CONNECTED LINEAGE — a branch of the
  //  genre family tree. Every round declares what it descends `from`
  //  (a real link on the map), and rounds run in lineage order.
  //  Each round has 3 example tracks that play 20s each, back to back.
  // ====================================================================
  const CHAPTERS = [
    {
      id: 'hcc', title: 'UK Dance & Bass', scene: 'London · 1991–2020',
      intro: 'One unbroken thread of British dance music — each style mutating directly into the next, born on pirate radio and sound systems.',
      outro: 'From rave hardcore to drill, every step here grew straight out of the one before it.',
      rounds: [
        { genre: 'Breakbeat Hardcore', from: ['Acid House'], note: 'UK rave sped acid house up and chopped in funk breakbeats and ragga samples.',
          tracks: [ { t: 'Charly', a: 'The Prodigy' }, { t: 'On a Ragga Tip', a: 'SL2' }, { t: 'Sweet Harmony', a: 'Liquid' } ] },
        { genre: 'Jungle', from: ['Breakbeat Hardcore', 'Dub'], note: 'Hardcore’s breakbeats chopped faster over deep reggae sub-bass.',
          tracks: [ { t: 'Original Nuttah', a: 'UK Apache & Shy FX' }, { t: 'Incredible', a: 'M-Beat' }, { t: 'Inner City Life', a: 'Goldie' } ] },
        { genre: 'UK Garage', from: ['House', 'Jungle'], note: 'Swung, soulful 2-step with chopped vocals and sub-bass.',
          tracks: [ { t: 'Re-Rewind (The Crowd Say Bo Selecta)', a: 'Artful Dodger' }, { t: 'Crazy Love', a: 'MJ Cole' }, { t: 'Sweet Like Chocolate', a: 'Shanks & Bigfoot' } ] },
        { genre: 'Grime', from: ['UK Garage'], note: 'Garage gone dark and aggressive at 140bpm, with rapid-fire MCs.',
          tracks: [ { t: 'I Luv U', a: 'Dizzee Rascal' }, { t: 'Eskimo', a: 'Wiley' }, { t: 'Shutdown', a: 'Skepta' } ] },
        { genre: 'Dubstep', from: ['UK Garage'], note: 'Garage’s skip stripped to half-time, with sub-bass wobble and space.',
          tracks: [ { t: 'Midnight Request Line', a: 'Skream' }, { t: 'Archangel', a: 'Burial' }, { t: 'Scary Monsters and Nice Sprites', a: 'Skrillex' } ] },
        { genre: 'UK Drill', from: ['Grime'], note: 'Grime’s cadence over sliding 808s and Chicago drill’s menace.',
          tracks: [ { t: 'Know Better', a: 'Headie One' }, { t: 'Day in the Life', a: 'Central Cee' }, { t: 'No Hook', a: 'Digga D' } ] },
      ],
    },
    {
      id: 'house', title: 'House Music', scene: 'Chicago · 1977–2010',
      intro: 'Disco never died — it was rebuilt on drum machines in Chicago and branched into the deepest, rawest house music.',
      outro: 'Every style here is a child of disco’s steady 4/4 kick, refracted through Chicago’s clubs.',
      rounds: [
        { genre: 'Disco', from: ['Funk'], note: 'Funk and soul rebuilt for the dancefloor with a four-on-the-floor kick.',
          tracks: [ { t: 'Le Freak', a: 'Chic' }, { t: 'I Feel Love', a: 'Donna Summer' }, { t: 'I Will Survive', a: 'Gloria Gaynor' } ] },
        { genre: 'Chicago House', from: ['Disco'], note: 'Disco rebuilt from a drum machine at the Warehouse club.',
          tracks: [ { t: 'Your Love', a: 'Frankie Knuckles' }, { t: 'Move Your Body', a: 'Marshall Jefferson' }, { t: 'Jack Your Body', a: 'Steve "Silk" Hurley' } ] },
        { genre: 'Acid House', from: ['Chicago House'], note: 'The squelch of the Roland TB-303 turned house psychedelic.',
          tracks: [ { t: 'Acid Tracks', a: 'Phuture' }, { t: 'Pacific State', a: '808 State' }, { t: 'Voodoo Ray', a: 'A Guy Called Gerald' } ] },
        { genre: 'Ghetto House', from: ['Chicago House'], note: 'Raw, fast, filthy Chicago house — minimal drum tracks and chanted hooks.',
          tracks: [ { t: 'Percolator', a: 'Cajmere' }, { t: 'Run', a: 'DJ Funk' }, { t: 'Freak Like Me', a: 'DJ Deeon' } ] },
        { genre: 'Footwork', from: ['Ghetto House'], note: 'Chicago’s 160bpm dance-battle music — stuttering chopped samples.',
          tracks: [ { t: 'Feelin\'', a: 'DJ Rashad' }, { t: 'Baby Come On', a: 'RP Boo' }, { t: 'Footworkin On Air', a: 'Traxman' } ] },
      ],
    },
    {
      id: 'techno', title: 'Techno', scene: 'Detroit & beyond · 1985–2010',
      intro: 'Detroit took house’s pulse and made it cold, futurist and purely electronic — then techno splintered into a dozen extremes.',
      outro: 'Acid, dub, minimal, industrial and gabber are all branches of the same Detroit machine-funk.',
      rounds: [
        { genre: 'Detroit Techno', from: ['Chicago House'], note: 'House’s pulse made robotic, sci-fi and machine-driven.',
          tracks: [ { t: 'Strings of Life', a: 'Derrick May' }, { t: 'No UFO\'s', a: 'Model 500' }, { t: 'The Bells', a: 'Jeff Mills' } ] },
        { genre: 'Acid Techno', from: ['Detroit Techno', 'Acid House'], note: 'Techno built around the relentless squelch of the 303.',
          tracks: [ { t: 'Acperience 1', a: 'Hardfloor' }, { t: 'Turkish Bazar', a: 'Emmanuel Top' }, { t: 'Higher State of Consciousness', a: 'Josh Wink' } ] },
        { genre: 'Dub Techno', from: ['Detroit Techno'], note: 'Techno drowned in echo and reverb — deep, foggy and hypnotic.',
          tracks: [ { t: 'Phylyps Trak', a: 'Basic Channel' }, { t: 'M-Series', a: 'Maurizio' }, { t: 'Never Tell You', a: 'Rhythm & Sound' } ] },
        { genre: 'Minimal Techno', from: ['Detroit Techno'], note: 'Techno stripped to its barest clicks, pops and microscopic grooves.',
          tracks: [ { t: 'Spastik', a: 'Plastikman' }, { t: 'Dexter', a: 'Ricardo Villalobos' }, { t: 'Minus', a: 'Robert Hood' } ] },
        { genre: 'Industrial Techno', from: ['Detroit Techno'], note: 'Harsh, distorted, pounding techno built for cavernous warehouses.',
          tracks: [ { t: 'Argon', a: 'Surgeon' }, { t: 'Why They Hide Their Bodies Under My Garage?', a: 'Blawan' }, { t: 'Take Your Body Off', a: 'Perc' } ] },
        { genre: 'Gabber', from: ['Acid Techno'], note: 'Rotterdam’s extreme hardcore techno — distorted kicks at brutal speed.',
          tracks: [ { t: 'Poing', a: 'Rotterdam Terror Corps' }, { t: 'Raise Your Fist', a: 'Angerfist' }, { t: 'We Have Arrived', a: 'Mescalinum United' } ] },
      ],
    },
    {
      id: 'punk', title: 'Punk', scene: 'USA & UK · 1976–2000',
      intro: 'Punk handed music back to anyone with three chords — then split into faster, harder and more emotional offshoots.',
      outro: 'Hardcore, emo, post-hardcore and pop-punk all trace straight back to punk’s year zero.',
      rounds: [
        { genre: 'Punk', from: ['Rock'], note: 'Fast, short, three-chord fury that tore up rock’s excess.',
          tracks: [ { t: 'Blitzkrieg Bop', a: 'Ramones' }, { t: 'Anarchy in the U.K.', a: 'Sex Pistols' }, { t: 'London Calling', a: 'The Clash' } ] },
        { genre: 'Hardcore Punk', from: ['Punk'], note: 'Punk taken to its limit — faster, harder, shorter, fiercely DIY.',
          tracks: [ { t: 'Rise Above', a: 'Black Flag' }, { t: 'Pay to Cum', a: 'Bad Brains' }, { t: 'Minor Threat', a: 'Minor Threat' } ] },
        { genre: 'Post-Hardcore', from: ['Hardcore Punk'], note: 'Hardcore’s intensity made angular and dynamic — tension into release.',
          tracks: [ { t: 'Waiting Room', a: 'Fugazi' }, { t: 'One Armed Scissor', a: 'At the Drive-In' }, { t: 'New Noise', a: 'Refused' } ] },
        { genre: 'Emo', from: ['Hardcore Punk'], note: '"Emotional hardcore" — raw, confessional catharsis over punk dynamics.',
          tracks: [ { t: 'Seven', a: 'Sunny Day Real Estate' }, { t: 'For Want Of', a: 'Rites of Spring' }, { t: 'Never Meant', a: 'American Football' } ] },
        { genre: 'Pop-Punk', from: ['Punk'], note: 'Punk’s three chords made bright, fast and catchy.',
          tracks: [ { t: 'Basket Case', a: 'Green Day' }, { t: 'All the Small Things', a: 'blink-182' }, { t: 'Self Esteem', a: 'The Offspring' } ] },
        { genre: 'Ska Punk', from: ['Hardcore Punk', 'Ska'], note: 'Jamaican ska’s offbeat skank welded to American punk speed and horns.',
          tracks: [ { t: 'Santeria', a: 'Sublime' }, { t: 'Sell Out', a: 'Reel Big Fish' }, { t: 'The Impression That I Get', a: 'The Mighty Mighty Bosstones' } ] },
      ],
    },
    {
      id: 'afterpunk', title: 'Post-Punk & New Wave', scene: 'UK & USA · 1978–1991',
      intro: 'The other branch off punk — turned inward, arty and electronic, building the alternative underground.',
      outro: 'Goth, synth-pop and shoegaze all flowered from post-punk and new wave.',
      rounds: [
        { genre: 'Post-Punk', from: ['Punk'], note: 'Punk turned experimental — angular guitars, dub bass and cold atmosphere.',
          tracks: [ { t: 'Love Will Tear Us Apart', a: 'Joy Division' }, { t: 'Damaged Goods', a: 'Gang of Four' }, { t: 'Hong Kong Garden', a: 'Siouxsie and the Banshees' } ] },
        { genre: 'New Wave', from: ['Punk'], note: 'Punk’s energy channelled into art-school hooks, synths and style.',
          tracks: [ { t: 'Once in a Lifetime', a: 'Talking Heads' }, { t: 'Heart of Glass', a: 'Blondie' }, { t: 'Whip It', a: 'Devo' } ] },
        { genre: 'Goth Rock', from: ['Post-Punk'], note: 'Post-punk gone dark and theatrical — chorused guitars and graveyard romance.',
          tracks: [ { t: 'Bela Lugosi\'s Dead', a: 'Bauhaus' }, { t: 'This Corrosion', a: 'The Sisters of Mercy' }, { t: 'A Forest', a: 'The Cure' } ] },
        { genre: 'Synth-Pop', from: ['New Wave'], note: 'New wave with the guitars swapped for synthesizers — sleek electronic pop.',
          tracks: [ { t: 'Just Can\'t Get Enough', a: 'Depeche Mode' }, { t: 'Cars', a: 'Gary Numan' }, { t: 'Blue Monday', a: 'New Order' } ] },
        { genre: 'Shoegaze', from: ['Post-Punk', 'New Wave'], note: 'Walls of blurred, effect-drenched guitar over dreamy melodies.',
          tracks: [ { t: 'Only Shallow', a: 'My Bloody Valentine' }, { t: 'Alison', a: 'Slowdive' }, { t: 'Vapour Trail', a: 'Ride' } ] },
      ],
    },
    {
      id: 'metal', title: 'Metal', scene: 'Worldwide · 1980–2005',
      intro: 'Heavy metal split into a dense thicket of extremes — each subgenre pushing a different limit of speed, weight or darkness.',
      outro: 'Thrash bred death and black metal; doom slowed it down; nu metal and metalcore dragged it back into the charts.',
      rounds: [
        { genre: 'Thrash Metal', from: ['Heavy Metal', 'Hardcore Punk'], note: 'Punk speed welded to metal riffing — tight, fast, aggressive.',
          tracks: [ { t: 'Master of Puppets', a: 'Metallica' }, { t: 'Raining Blood', a: 'Slayer' }, { t: 'Holy Wars... The Punishment Due', a: 'Megadeth' } ] },
        { genre: 'Death Metal', from: ['Thrash Metal'], note: 'Guttural growls, blast beats and brutal downtuned riffing.',
          tracks: [ { t: 'Pull the Plug', a: 'Death' }, { t: 'God of Emptiness', a: 'Morbid Angel' }, { t: 'Hammer Smashed Face', a: 'Cannibal Corpse' } ] },
        { genre: 'Black Metal', from: ['Thrash Metal'], note: 'Tremolo-picked guitars, shrieked vocals and lo-fi, freezing atmosphere.',
          tracks: [ { t: 'Freezing Moon', a: 'Mayhem' }, { t: 'I Am the Black Wizards', a: 'Emperor' }, { t: 'Transilvanian Hunger', a: 'Darkthrone' } ] },
        { genre: 'Doom Metal', from: ['Heavy Metal'], note: 'Slow, crushing, blues-heavy riffs and a sense of dread.',
          tracks: [ { t: 'Black Sabbath', a: 'Black Sabbath' }, { t: 'Solitude', a: 'Candlemass' }, { t: 'Funeralopolis', a: 'Electric Wizard' } ] },
        { genre: 'Nu Metal', from: ['Heavy Metal', 'Hip-Hop'], note: 'Downtuned riffs fused with hip-hop rhythm and rapped vocals.',
          tracks: [ { t: 'Freak on a Leash', a: 'Korn' }, { t: 'Chop Suey!', a: 'System of a Down' }, { t: 'One Step Closer', a: 'Linkin Park' } ] },
        { genre: 'Metalcore', from: ['Hardcore Punk', 'Death Metal'], note: 'Hardcore breakdowns spliced with melodic death-metal riffing.',
          tracks: [ { t: 'My Curse', a: 'Killswitch Engage' }, { t: 'Nothing Left', a: 'As I Lay Dying' }, { t: 'Pull Harder on the Strings of Your Martyr', a: 'Trivium' } ] },
      ],
    },
    {
      id: 'soundsystem', title: 'Reggae & Dancehall', scene: 'Jamaica → Latin America · 1962–2010',
      intro: 'Jamaica invented one lineage that conquered the world — and its dembow riddim eventually became the heartbeat of Latin pop.',
      outro: 'Ska to reggaeton: one unbroken sound-system bloodline crossing the Caribbean.',
      rounds: [
        { genre: 'Ska', from: ['Rhythm & Blues'], note: 'Jamaica’s first homegrown pop — a skipping offbeat over jumped-up R&B.',
          tracks: [ { t: 'Guns of Navarone', a: 'The Skatalites' }, { t: 'Israelites', a: 'Desmond Dekker' }, { t: '54-46 Was My Number', a: 'Toots & The Maytals' } ] },
        { genre: 'Rocksteady', from: ['Ska'], note: 'Ska slowed to a cool, romantic crawl with the bass stepped forward.',
          tracks: [ { t: 'Get Ready - Rock Steady', a: 'Alton Ellis' }, { t: 'The Tide Is High', a: 'The Paragons' }, { t: 'Everything I Own', a: 'Ken Boothe' } ] },
        { genre: 'Reggae', from: ['Rocksteady'], note: 'The one-drop rhythm and Rastafari message that went worldwide.',
          tracks: [ { t: 'Could You Be Loved', a: 'Bob Marley & The Wailers' }, { t: 'The Harder They Come', a: 'Jimmy Cliff' }, { t: 'Pressure Drop', a: 'Toots & The Maytals' } ] },
        { genre: 'Dub', from: ['Reggae'], note: 'Engineers remixed reggae into echo-drenched, bass-heavy instrumentals.',
          tracks: [ { t: 'King Tubby Meets Rockers Uptown', a: 'Augustus Pablo' }, { t: 'Blackboard Jungle Dub', a: 'Lee "Scratch" Perry' }, { t: 'Dub Fi Gwan', a: 'King Tubby' } ] },
        { genre: 'Dancehall', from: ['Reggae'], note: 'Reggae went digital and DJ-led — sparse riddims and rapid toasting.',
          tracks: [ { t: 'Under Mi Sleng Teng', a: 'Wayne Smith' }, { t: 'Mr. Loverman', a: 'Shabba Ranks' }, { t: 'Get Busy', a: 'Sean Paul' } ] },
        { genre: 'Reggaeton', from: ['Dancehall'], note: 'Dancehall’s dembow riddim crossed with rap in Spanish.',
          tracks: [ { t: 'Gasolina', a: 'Daddy Yankee' }, { t: 'Danza Kuduro', a: 'Don Omar' }, { t: 'Rakata', a: 'Wisin & Yandel' } ] },
      ],
    },
    {
      id: 'carioca', title: 'Brazilian Funk', scene: 'Brazil · 1989–2020',
      intro: 'Miami bass landed in Rio’s favelas and became its own self-feeding lineage of party music.',
      outro: 'Every Brazilian funk style here grew directly out of baile funk’s raw template.',
      rounds: [
        { genre: 'Miami Bass', from: ['Electro'], note: 'Booming 808 sub-bass and call-and-response chants from Florida.',
          tracks: [ { t: 'Me So Horny', a: '2 Live Crew' }, { t: 'Drop the Bass', a: 'DJ Magic Mike' }, { t: 'Whoot, There It Is', a: '95 South' } ] },
        { genre: 'Baile Funk', from: ['Miami Bass'], note: 'Rio’s favela party music — Miami-bass beats and chanted vocals.',
          tracks: [ { t: 'Bum Bum Tam Tam', a: 'MC Fioti' }, { t: 'Olha a Explosão', a: 'MC Kevinho' }, { t: 'Vai Malandra', a: 'Anitta' } ] },
        { genre: 'Funk Ostentação', from: ['Baile Funk'], note: 'São Paulo’s flashy, luxury-flexing funk over heavy melodic beats.',
          tracks: [ { t: 'Plaque de 100', a: 'MC Guimê' }, { t: 'Bolha de Sabão', a: 'MC Bin Laden' }, { t: 'País do Futebol', a: 'MC Guimê' } ] },
        { genre: 'Brega Funk', from: ['Baile Funk'], note: 'Recife’s melodic, brega-tinged take on funk — slower and catchy.',
          tracks: [ { t: 'Envolvimento', a: 'MC Loma e As Gêmeas Lacração' }, { t: 'Tubarão Te Amo', a: 'Shevchenko e Elloco' }, { t: 'Tá Tranquilo Tá Favorável', a: 'MC Bin Laden' } ] },
      ],
    },
    {
      id: 'westafrica', title: 'West African Pop', scene: 'Ghana & Nigeria · 1955–2020',
      intro: 'A single West African pop lineage — colonial brass and jazz reworked again and again into the continent’s modern sound.',
      outro: 'Highlife to afrobeats: one continuous Ghanaian-Nigerian thread, now topping global charts.',
      rounds: [
        { genre: 'Highlife', from: ['Jazz'], note: 'Ghana’s blend of brass-band swing, jazz and local melody.',
          tracks: [ { t: 'All for You', a: 'E.T. Mensah' }, { t: 'Sunshine Day', a: 'Osibisa' }, { t: 'Yamona', a: 'Pat Thomas' } ] },
        { genre: 'Afrobeat', from: ['Highlife', 'Funk'], note: 'Fela Kuti’s fusion of highlife horns, Yoruba rhythm, funk and jazz.',
          tracks: [ { t: 'Zombie', a: 'Fela Kuti' }, { t: 'Water No Get Enemy', a: 'Fela Kuti' }, { t: 'Secret Agent', a: 'Tony Allen' } ] },
        { genre: 'Hiplife', from: ['Highlife', 'Hip-Hop'], note: 'Highlife crossed with hip-hop — Ghanaian rap over local grooves.',
          tracks: [ { t: 'Keep Your Eyes on the Road', a: 'Reggie Rockstone' }, { t: 'Ahomka Womu', a: 'VIP' }, { t: 'U Go Kill Me', a: 'Sarkodie' } ] },
        { genre: 'Azonto', from: ['Hiplife'], note: 'Ghana’s bouncy, danceable hiplife offshoot of the early 2010s.',
          tracks: [ { t: 'Azonto', a: 'Fuse ODG' }, { t: 'Telemo', a: 'Gasmilla' }, { t: 'Obuu Mo', a: 'E.L' } ] },
        { genre: 'Afrobeats', from: ['Afrobeat', 'Hiplife', 'Dancehall'], note: 'West Africa’s slick modern pop — blended with dancehall, R&B and hip-hop.',
          tracks: [ { t: 'Essence', a: 'Wizkid' }, { t: 'Ye', a: 'Burna Boy' }, { t: 'Fall', a: 'Davido' } ] },
      ],
    },
    {
      id: 'sahouse', title: 'South African House', scene: 'South Africa · 1994–2022',
      intro: 'South Africa took imported house and kept bending it — one local lineage from kwaito to the world-conquering amapiano.',
      outro: 'Kwaito, gqom and amapiano are all the same South African house impulse, a generation apart.',
      rounds: [
        { genre: 'Kwaito', from: ['House'], note: 'Post-apartheid house slowed down and toasted over in township slang.',
          tracks: [ { t: 'Nkalakatha', a: 'Mandoza' }, { t: 'Shibobo', a: 'TKZee' }, { t: 'It\'s About Time', a: 'Boom Shaka' } ] },
        { genre: 'Gqom', from: ['Kwaito', 'House'], note: 'Durban’s dark, broken, minimal house — raw drums and ominous space.',
          tracks: [ { t: 'Omunye', a: 'Distruction Boyz' }, { t: 'Ice Drop', a: 'DJ Lag' }, { t: 'Wololo', a: 'Babes Wodumo' } ] },
        { genre: 'Amapiano', from: ['Kwaito', 'House'], note: 'Jazzy keys, airy pads and deep log-drum basslines — the 2020s dance sound.',
          tracks: [ { t: 'Ke Star', a: 'Focalistic' }, { t: 'Mnike', a: 'Tyler ICU' }, { t: 'Asibe Happy', a: 'Kabza De Small' } ] },
      ],
    },
    {
      id: 'hiphop', title: 'Hip-Hop', scene: 'USA · 1979–2015',
      intro: 'From Bronx block parties, one rap lineage branched across America — each regional sound feeding the next.',
      outro: 'Old-school to drill: turntables and sampling reshaped into trap, phonk and beyond.',
      rounds: [
        { genre: 'Old-School Hip-Hop', from: ['Funk', 'Disco'], note: 'Bronx DJs looped funk and disco breaks while MCs rhymed over them.',
          tracks: [ { t: 'Rapper\'s Delight', a: 'The Sugarhill Gang' }, { t: 'The Message', a: 'Grandmaster Flash & The Furious Five' }, { t: 'Planet Rock', a: 'Afrika Bambaataa' } ] },
        { genre: 'Boom Bap', from: ['Old-School Hip-Hop'], note: 'The golden-age sound: hard dusty drum breaks and jazz/soul samples.',
          tracks: [ { t: 'N.Y. State of Mind', a: 'Nas' }, { t: 'C.R.E.A.M.', a: 'Wu-Tang Clan' }, { t: 'Juicy', a: 'The Notorious B.I.G.' } ] },
        { genre: 'Memphis Rap', from: ['Boom Bap'], note: 'Murky, menacing, lo-fi Southern rap — the seedbed of phonk.',
          tracks: [ { t: 'Tear da Club Up \'97', a: 'Three 6 Mafia' }, { t: 'Chickenhead', a: 'Project Pat' }, { t: 'Meet Yo Maker', a: 'Tommy Wright III' } ] },
        { genre: 'Trap', from: ['Boom Bap'], note: 'Southern hip-hop on booming 808s, rattling hi-hats and cinematic synths.',
          tracks: [ { t: 'Rubber Band Man', a: 'T.I.' }, { t: 'Mask Off', a: 'Future' }, { t: 'Bad and Boujee', a: 'Migos' } ] },
        { genre: 'Phonk', from: ['Memphis Rap'], note: 'Memphis rap samples, cowbells and distortion — drift-video music.',
          tracks: [ { t: 'Close Eyes', a: 'DVRST' }, { t: 'Murder in My Mind', a: 'Kordhell' }, { t: 'Why Not', a: 'Ghostface Playa' } ] },
        { genre: 'Drill', from: ['Trap'], note: 'Chicago’s bleak, ominous offshoot of trap — sparse and menacing.',
          tracks: [ { t: 'Love Sosa', a: 'Chief Keef' }, { t: 'L\'s Anthem', a: 'Lil Durk' }, { t: 'Welcome to the Party', a: 'Pop Smoke' } ] },
      ],
    },
    {
      id: 'rockfound', title: 'Classic Rock', scene: 'USA & UK · 1955–1975',
      intro: 'Before punk and metal, rock built its base — from rock ’n’ roll through psychedelia to hard and prog.',
      outro: 'Every later rock branch — punk, metal, alternative — grew from these foundations.',
      rounds: [
        { genre: "Rock 'n' Roll", from: ['Blues', 'Rhythm & Blues'], note: 'Backbeat, guitar and teenage rebellion — R&B crossed over to the mainstream.',
          tracks: [ {t:"Johnny B. Goode",a:"Chuck Berry"},{t:"Tutti Frutti",a:"Little Richard"},{t:"Jailhouse Rock",a:"Elvis Presley"},{t:"Great Balls of Fire",a:"Jerry Lee Lewis"} ] },
        { genre: 'Psychedelic Rock', from: ["Rock 'n' Roll", 'Blues Rock'], note: 'Studio experimentation, wah guitar and mind-expansion in the late ’60s.',
          tracks: [ {t:"Purple Haze",a:"The Jimi Hendrix Experience"},{t:"White Rabbit",a:"Jefferson Airplane"},{t:"Light My Fire",a:"The Doors"},{t:"Sunshine of Your Love",a:"Cream"} ] },
        { genre: 'Hard Rock', from: ['Psychedelic Rock', 'Blues Rock'], note: 'Louder, heavier, riff-driven rock — the bridge toward metal.',
          tracks: [ {t:"Whole Lotta Love",a:"Led Zeppelin"},{t:"Smoke on the Water",a:"Deep Purple"},{t:"Back in Black",a:"AC/DC"},{t:"Welcome to the Jungle",a:"Guns N' Roses"} ] },
        { genre: 'Prog Rock', from: ['Psychedelic Rock'], note: 'Ambitious, complex, conceptual rock with long suites and odd time signatures.',
          tracks: [ {t:"Money",a:"Pink Floyd"},{t:"Roundabout",a:"Yes"},{t:"Tom Sawyer",a:"Rush"},{t:"21st Century Schizoid Man",a:"King Crimson"} ] },
        { genre: 'Glam Rock', from: ['Hard Rock'], note: 'Glitter, stomp and androgyny — rock as theatrical pop spectacle.',
          tracks: [ {t:"Get It On",a:"T. Rex"},{t:"Ziggy Stardust",a:"David Bowie"},{t:"Ballroom Blitz",a:"Sweet"},{t:"Cum On Feel the Noize",a:"Slade"} ] },
      ],
    },
    {
      id: 'metalx', title: 'Extreme Metal', scene: 'Worldwide · 1985–2010',
      intro: 'Beyond the core four, metal kept pushing — faster, heavier, weirder and more theatrical.',
      outro: 'From power metal’s gallop to grindcore’s blast, metal explored every extreme.',
      rounds: [
        { genre: 'Power Metal', from: ['Heavy Metal', 'Speed Metal'], note: 'Galloping tempos, soaring vocals and fantasy themes.',
          tracks: [ {t:"I Want Out",a:"Helloween"},{t:"Through the Fire and Flames",a:"DragonForce"},{t:"The Bard's Song",a:"Blind Guardian"},{t:"Carolus Rex",a:"Sabaton"} ] },
        { genre: 'Progressive Metal', from: ['Thrash Metal', 'Prog Rock'], note: 'Technical, complex metal with shifting time signatures.',
          tracks: [ {t:"Pull Me Under",a:"Dream Theater"},{t:"Schism",a:"Tool"},{t:"Blackwater Park",a:"Opeth"},{t:"Blood and Thunder",a:"Mastodon"} ] },
        { genre: 'Sludge Metal', from: ['Doom Metal', 'Hardcore Punk'], note: 'Slow, filthy, downtuned riffs dragged through the swamp.',
          tracks: [ {t:"Snakes for the Divine",a:"High on Fire"},{t:"Planets Collide",a:"Crowbar"},{t:"Bleeding Out",a:"Crowbar"},{t:"Aqua Teen",a:"Mastodon"} ] },
        { genre: 'Grindcore', from: ['Death Metal', 'Hardcore Punk'], note: 'Ultra-short, ultra-fast blasts of noise and fury.',
          tracks: [ {t:"You Suffer",a:"Napalm Death"},{t:"Suffer the Children",a:"Napalm Death"},{t:"Heartwork",a:"Carcass"},{t:"The Diplomat",a:"Pig Destroyer"} ] },
        { genre: 'Industrial Metal', from: ['Thrash Metal', 'Industrial Techno'], note: 'Metal welded to machine rhythms and electronic noise.',
          tracks: [ {t:"Du Hast",a:"Rammstein"},{t:"Wish",a:"Nine Inch Nails"},{t:"Jesus Built My Hotrod",a:"Ministry"},{t:"Spit",a:"KMFDM"} ] },
      ],
    },
    {
      id: 'folk', title: 'Folk', scene: 'Worldwide · 1940–2015',
      intro: 'Acoustic storytelling traditions and their modern revivals.',
      outro: 'Folk’s plainspoken songcraft feeds country, indie and singer-songwriter pop alike.',
      rounds: [
        { genre: 'Folk', from: ['Traditional ballads'], note: 'Plainspoken acoustic songs of work, protest and everyday life.',
          tracks: [ {t:"This Land Is Your Land",a:"Woody Guthrie"},{t:"If I Had a Hammer",a:"Pete Seeger"},{t:"Goodnight, Irene",a:"Lead Belly"},{t:"Worried Man Blues",a:"The Carter Family"} ] },
        { genre: 'Folk Revival', from: ['Folk', 'Blues'], note: 'The ’60s singer-songwriter wave that turned folk into pop poetry.',
          tracks: [ {t:"Blowin' in the Wind",a:"Bob Dylan"},{t:"The Sound of Silence",a:"Simon & Garfunkel"},{t:"Big Yellow Taxi",a:"Joni Mitchell"},{t:"Pink Moon",a:"Nick Drake"} ] },
        { genre: 'Celtic Folk', from: ['Folk'], note: 'Fiddles, pipes and ballads from Ireland and Scotland.',
          tracks: [ {t:"Whiskey in the Jar",a:"The Dubliners"},{t:"Theme from Harry's Game",a:"Clannad"},{t:"The Foggy Dew",a:"The Chieftains"},{t:"Caledonia",a:"Dougie MacLean"} ] },
        { genre: 'Bluegrass', from: ['Folk', 'Country'], note: 'Virtuosic banjo, fiddle and high-lonesome harmony from Appalachia.',
          tracks: [ {t:"Blue Moon of Kentucky",a:"Bill Monroe"},{t:"Foggy Mountain Breakdown",a:"Flatt & Scruggs"},{t:"Man of Constant Sorrow",a:"The Stanley Brothers"},{t:"Rocky Top",a:"The Osborne Brothers"} ] },
        { genre: 'Indie Folk', from: ['Folk Revival', 'Indie Rock'], note: 'Hushed, layered, introspective folk for the 21st century.',
          tracks: [ {t:"White Winter Hymnal",a:"Fleet Foxes"},{t:"Skinny Love",a:"Bon Iver"},{t:"Little Lion Man",a:"Mumford & Sons"},{t:"Chicago",a:"Sufjan Stevens"} ] },
      ],
    },
    {
      id: 'brazilroots', title: 'Samba & Bossa Nova', scene: 'Brazil · 1930–1975',
      intro: 'Brazil’s acoustic golden age — samba and its sophisticated descendants.',
      outro: 'Samba, bossa and MPB define Brazilian song and ripple through world music.',
      rounds: [
        { genre: 'Samba', from: ['Choro', 'Maxixe'], note: 'Brazil’s national rhythm — syncopated, percussive and irresistible.',
          tracks: [ {t:"O Mundo é um Moinho",a:"Cartola"},{t:"Deixa a Vida Me Levar",a:"Zeca Pagodinho"},{t:"Vou Festejar",a:"Beth Carvalho"},{t:"Aquarela do Brasil",a:"Ary Barroso"} ] },
        { genre: 'Bossa Nova', from: ['Samba', 'Jazz'], note: 'Samba softened with cool jazz harmony and whispered vocals.',
          tracks: [ {t:"Garota de Ipanema",a:"Stan Getz & João Gilberto"},{t:"Chega de Saudade",a:"João Gilberto"},{t:"Wave",a:"Antônio Carlos Jobim"},{t:"Mas Que Nada",a:"Sérgio Mendes"} ] },
        { genre: 'MPB', from: ['Bossa Nova', 'Samba'], note: 'Música Popular Brasileira — Brazil’s sophisticated post-bossa songwriting.',
          tracks: [ {t:"Águas de Março",a:"Elis Regina"},{t:"Como Nossos Pais",a:"Elis Regina"},{t:"Travessia",a:"Milton Nascimento"},{t:"Construção",a:"Chico Buarque"} ] },
        { genre: 'Tropicália', from: ['Bossa Nova', 'Psychedelic Rock'], note: 'The late-’60s avant-garde fusion of Brazilian song and psych rock.',
          tracks: [ {t:"A Minha Menina",a:"Os Mutantes"},{t:"Tropicália",a:"Caetano Veloso"},{t:"Baby",a:"Gal Costa"},{t:"Panis et Circenses",a:"Os Mutantes"} ] },
        { genre: 'Forró', from: ['Baião'], note: 'Northeastern dance music driven by accordion, triangle and zabumba.',
          tracks: [ {t:"Asa Branca",a:"Luiz Gonzaga"},{t:"Xote dos Milagres",a:"Falamansa"},{t:"Eu Só Quero Um Xodó",a:"Dominguinhos"},{t:"Anunciação",a:"Alceu Valença"} ] },
      ],
    },
    {
      id: 'asia', title: 'Asian Pop', scene: 'East Asia · 1980–2020',
      intro: 'Pop powerhouses from Tokyo to Seoul to Hong Kong.',
      outro: 'From city pop to K-pop, East Asian pop now sets global trends.',
      rounds: [
        { genre: 'City Pop', from: ['Funk', 'Jazz Fusion', 'Disco'], note: 'Glossy, urban Japanese pop of the ’80s boom years.',
          tracks: [ {t:"Ride on Time",a:"Tatsuro Yamashita"},{t:"Plastic Love",a:"Mariya Takeuchi"},{t:"Last Summer Whisper",a:"Anri"},{t:"Stay with Me",a:"Miki Matsubara"} ] },
        { genre: 'J-Pop', from: ['Pop', 'City Pop'], note: 'Japan’s mainstream pop — bright, polished and hook-driven.',
          tracks: [ {t:"First Love",a:"Hikaru Utada"},{t:"PONPONPON",a:"Kyary Pamyu Pamyu"},{t:"Polyrhythm",a:"Perfume"},{t:"Can You Celebrate?",a:"Namie Amuro"} ] },
        { genre: 'K-Pop', from: ['Pop', 'Hip-Hop', 'J-Pop'], note: 'Korea’s slick, choreographed idol pop — now a global force.',
          tracks: [ {t:"Dynamite",a:"BTS"},{t:"DDU-DU DDU-DU",a:"BLACKPINK"},{t:"Gangnam Style",a:"PSY"},{t:"Gee",a:"Girls' Generation"} ] },
        { genre: 'Mandopop', from: ['Pop', 'Cantopop'], note: 'Mandarin-language pop balladry and R&B from Taiwan and China.',
          tracks: [ {t:"The Moon Represents My Heart",a:"Teresa Teng"},{t:"Qing Hua Ci",a:"Jay Chou"},{t:"Red Bean",a:"Faye Wong"},{t:"Long Juan Feng",a:"Jay Chou"} ] },
        { genre: 'Cantopop', from: ['Pop', 'Shidaiqu'], note: 'Cantonese pop from Hong Kong’s ’80s–’90s golden age.',
          tracks: [ {t:"海闊天空",a:"Beyond"},{t:"Monica",a:"Leslie Cheung"},{t:"親密愛人",a:"Sandy Lam"},{t:"K歌之王",a:"Eason Chan"} ] },
      ],
    },
  ];

  // Extra tracks per sub-genre — enlarges each pool so the 3 played clips are
  // randomised on every load. (Double-quoted to avoid apostrophe escaping.)
  const EXTRA = {
    "Breakbeat Hardcore": [{t:"Trip II the Moon",a:"Acen"},{t:"Sound of Eden",a:"Shades of Rhythm"}],
    "Jungle": [{t:"Junglist",a:"Congo Natty"},{t:"Style from the Dark Side",a:"Aphrodite"}],
    "UK Garage": [{t:"Flowers",a:"Sweet Female Attitude"},{t:"Gotta Get Thru This",a:"Daniel Bedingfield"}],
    "Grime": [{t:"Ps and Qs",a:"Kano"},{t:"Pow! (Forward)",a:"Lethal Bizzle"}],
    "Dubstep": [{t:"Night",a:"Benga"},{t:"Where's My Money",a:"Caspa"}],
    "UK Drill": [{t:"Body",a:"Russ Millions & Tion Wayne"},{t:"Homerton B",a:"Unknown T"}],
    "Disco": [{t:"Good Times",a:"Chic"},{t:"We Are Family",a:"Sister Sledge"}],
    "Chicago House": [{t:"Promised Land",a:"Joe Smooth"},{t:"Can You Feel It",a:"Mr. Fingers"}],
    "Acid House": [{t:"151",a:"Armando"},{t:"Where's Your Child",a:"Bam Bam"}],
    "Ghetto House": [{t:"Get Get Down",a:"Paul Johnson"},{t:"Wouldn't You Like to Be a Hoe Too",a:"DJ Slugo"}],
    "Footwork": [{t:"Erotic Heat",a:"Jlin"},{t:"Space Juke",a:"RP Boo"}],
    "Detroit Techno": [{t:"Clear",a:"Cybotron"},{t:"Jaguar",a:"Underground Resistance"}],
    "Acid Techno": [{t:"I Love Acid",a:"Luke Vibert"},{t:"Komputer",a:"Bryan Zentz"}],
    "Dub Techno": [{t:"Biokinetics",a:"Porter Ricks"},{t:"Sustain",a:"Deepchord"}],
    "Minimal Techno": [{t:"Losing Control",a:"Daniel Bell"},{t:"Charly",a:"Pan-Pot"}],
    "Industrial Techno": [{t:"Colonized",a:"Paula Temple"},{t:"Blood Witness",a:"Regis"}],
    "Gabber": [{t:"Rainbow in the Sky",a:"DJ Paul Elstak"},{t:"Army of Hardcore",a:"Neophyte"}],
    "Punk": [{t:"New Rose",a:"The Damned"},{t:"Ever Fallen in Love",a:"Buzzcocks"}],
    "Hardcore Punk": [{t:"Holiday in Cambodia",a:"Dead Kennedys"},{t:"Wild in the Streets",a:"Circle Jerks"}],
    "Post-Hardcore": [{t:"Dine Alone",a:"Quicksand"},{t:"Bury Your Flame",a:"Hot Snakes"}],
    "Emo": [{t:"Why Did Ever We Meet",a:"The Promise Ring"},{t:"Gloria",a:"Mineral"}],
    "Pop-Punk": [{t:"Fat Lip",a:"Sum 41"},{t:"Sugar, We're Goin Down",a:"Fall Out Boy"}],
    "Ska Punk": [{t:"Superman",a:"Goldfinger"},{t:"Sound System",a:"Operation Ivy"}],
    "Post-Punk": [{t:"Public Image",a:"Public Image Ltd"},{t:"Marquee Moon",a:"Television"}],
    "New Wave": [{t:"Just What I Needed",a:"The Cars"},{t:"Everybody Wants to Rule the World",a:"Tears for Fears"}],
    "Goth Rock": [{t:"Temple of Love",a:"The Sisters of Mercy"},{t:"Moonchild",a:"Fields of the Nephilim"}],
    "Synth-Pop": [{t:"Tainted Love",a:"Soft Cell"},{t:"Only You",a:"Yazoo"}],
    "Shoegaze": [{t:"Sweetness and Light",a:"Lush"},{t:"Cherry-Coloured Funk",a:"Cocteau Twins"}],
    "Thrash Metal": [{t:"Caught in a Mosh",a:"Anthrax"},{t:"Bonded by Blood",a:"Exodus"}],
    "Death Metal": [{t:"Slowly We Rot",a:"Obituary"},{t:"Dead by Dawn",a:"Deicide"}],
    "Black Metal": [{t:"Dunkelheit",a:"Burzum"},{t:"A Fine Day to Die",a:"Bathory"}],
    "Doom Metal": [{t:"Born Too Late",a:"Saint Vitus"},{t:"Dragonaut",a:"Sleep"}],
    "Nu Metal": [{t:"Wait and Bleed",a:"Slipknot"},{t:"My Own Summer (Shove It)",a:"Deftones"}],
    "Metalcore": [{t:"Carrion",a:"Parkway Drive"},{t:"Tears Don't Fall",a:"Bullet for My Valentine"}],
    "Ska": [{t:"Al Capone",a:"Prince Buster"},{t:"Simmer Down",a:"The Wailers"}],
    "Rocksteady": [{t:"Perfidia",a:"Phyllis Dillon"},{t:"Pretty Looks Isn't All",a:"The Heptones"}],
    "Reggae": [{t:"Marcus Garvey",a:"Burning Spear"},{t:"Night Nurse",a:"Gregory Isaacs"}],
    "Dub": [{t:"Beam Me Up Scotty",a:"Scientist"},{t:"Black Ark",a:"Mad Professor"}],
    "Dancehall": [{t:"Who Am I",a:"Beenie Man"},{t:"Clarks",a:"Vybz Kartel"}],
    "Reggaeton": [{t:"Pa' Que Retozen",a:"Tego Calderón"},{t:"Quiero Bailar",a:"Ivy Queen"}],
    "Miami Bass": [{t:"Whoomp! (There It Is)",a:"Tag Team"},{t:"C'mon N' Ride It (The Train)",a:"Quad City DJ's"}],
    "Baile Funk": [{t:"Cerol na Mão",a:"Bonde do Tigrão"},{t:"Boladona",a:"Tati Quebra Barraco"}],
    "Funk Ostentação": [{t:"Fugir pra Onde",a:"MC Livinho"},{t:"Cara Bacana",a:"MC G15"}],
    "Brega Funk": [{t:"Vai Novinha",a:"Kevin o Chris"},{t:"Evoluiu",a:"Kevin o Chris"}],
    "Highlife": [{t:"Aben Wo Ha",a:"Daddy Lumba"},{t:"Yaa Amponsah",a:"Koo Nimo"}],
    "Afrobeat": [{t:"Beng Beng Beng",a:"Femi Kuti"},{t:"Lady",a:"Fela Kuti"}],
    "Hiplife": [{t:"Oye Ohene",a:"Obrafour"},{t:"Aha",a:"Tic Tac"}],
    "Azonto": [{t:"Shashee Wowo",a:"Stay Jay"},{t:"Lapaz Toyota",a:"Guru"}],
    "Afrobeats": [{t:"Calm Down",a:"Rema"},{t:"Love Nwantiti",a:"CKay"}],
    "Kwaito": [{t:"Kaffir",a:"Arthur Mafokate"},{t:"Sweety Lavo",a:"Trompies"}],
    "Gqom": [{t:"Mercedes",a:"Rudeboyz"},{t:"Pakisha",a:"Dladla Mshunqisi"}],
    "Amapiano": [{t:"Izolo",a:"DJ Maphorisa"},{t:"Woza",a:"Mr JazziQ"}],
    "Old-School Hip-Hop": [{t:"The Breaks",a:"Kurtis Blow"},{t:"Sucker M.C.'s",a:"Run-DMC"}],
    "Boom Bap": [{t:"Mass Appeal",a:"Gang Starr"},{t:"Shook Ones, Pt. II",a:"Mobb Deep"}],
    "Memphis Rap": [{t:"Sippin on Some Syrup",a:"Three 6 Mafia"},{t:"Armed Robbery",a:"Eightball & MJG"}],
    "Trap": [{t:"Lemonade",a:"Gucci Mane"},{t:"Soul Survivor",a:"Young Jeezy"}],
    "Phonk": [{t:"Limbo",a:"Freddie Dredd"},{t:"Phonky Town",a:"PlayaPhonk"}],
    "Drill": [{t:"Big Drip",a:"Fivio Foreign"},{t:"No Suburban Pt. 2",a:"Sheff G"}],
  };

  // Normalise tracks ({t,a} -> {title,artist}), fold in the extras, build pool.
  const ALL_GENRES = [];
  CHAPTERS.forEach((ch) => ch.rounds.forEach((r) => {
    if (EXTRA[r.genre]) r.tracks = r.tracks.concat(EXTRA[r.genre]);
    r.tracks = r.tracks.map((x) => ({ title: x.t, artist: x.a }));
    if (ALL_GENRES.indexOf(r.genre) < 0) ALL_GENRES.push(r.genre);
  }));

  // Spotify-Wrapped-style signature gradient per chapter.
  const HOME_COLORS = ['#7A4DFF', '#FF5CA8'];
  const CHAPTER_COLORS = {
    hcc: ['#FF5CA8', '#7A4DFF'], house: ['#FFC83D', '#FF6B39'], techno: ['#27E0C4', '#2D6CFF'],
    punk: ['#FF5C5C', '#FFB03A'], afterpunk: ['#B06BFF', '#FF7AD6'], metal: ['#AEB4C6', '#565B72'],
    soundsystem: ['#2BD96B', '#FFD23F'], carioca: ['#22D3FF', '#FFE14D'], westafrica: ['#FF8A3C', '#FFCE3C'],
    sahouse: ['#FF5CA0', '#36E27B'], hiphop: ['#FFC23C', '#FF5C7A'],
    rockfound: ['#FF6B5C', '#FFC23A'], metalx: ['#9AA0B5', '#3A3F55'], folk: ['#E8C57A', '#8FB36B'],
    brazilroots: ['#FFD23F', '#36C97B'], asia: ['#FF6BB0', '#7A6BFF'],
  };

  // Each chapter's broad family. Real decoys are drawn from the SAME family
  // so they stay believable (no ska-punk turning up in a hip-hop question).
  const CHAPTER_FAM = {
    hcc: 'uk', house: 'house', techno: 'house', punk: 'rock', afterpunk: 'rock',
    metal: 'metal', metalx: 'metal', rockfound: 'rock',
    soundsystem: 'jamaica', carioca: 'latin', westafrica: 'africa', sahouse: 'house', hiphop: 'hiphop',
    folk: 'folk', brazilroots: 'brazilroots', asia: 'asia',
  };
  const FAMILY_GENRES = {};
  CHAPTERS.forEach((ch) => {
    const f = CHAPTER_FAM[ch.id];
    FAMILY_GENRES[f] = FAMILY_GENRES[f] || [];
    ch.rounds.forEach((r) => { if (FAMILY_GENRES[f].indexOf(r.genre) < 0) FAMILY_GENRES[f].push(r.genre); });
  });
  // Believable but INVENTED decoys, matched to each family's style.
  const FAKES = {
    uk: ['Liquid Step', 'Chrome Step', 'Ghost Step', 'Shadow Step', 'Pulse Garage', 'Midnight Garage', 'Onyx Drill', 'Frost Bass', 'Halcyon Bass', 'Neon Dub'],
    house: ['Plasma House', 'Crystal Techno', 'Drift House', 'Volt Techno', 'Tidal Techno', 'Slate House', 'Cobalt Wave', 'Haze Acid'],
    rock: ['Cinder Punk', 'Fuzz Pop', 'Mirror Pop', 'Static Garage', 'Ash Punk', 'Chrome Wave', 'Velvet Gaze'],
    jamaica: ['Neon Dub', 'Echo Dub', 'Frost Skank', 'Golden Riddim', 'Haze Dub', 'Liquid Steppa'],
    latin: ['Neon Perreo', 'Volt Dembow', 'Ember Baile', 'Frost Funk', 'Solar Perreo', 'Pulse Bass'],
    africa: ['Dusk Soul', 'Iron Funk', 'Echo Highlife', 'Velvet Soul', 'Golden Azonto', 'Solar Pop'],
    hiphop: ['Ember Trap', 'Onyx Drill', 'Dusk Soul', 'Shadow Rap', 'Cloud Trap', 'Iron Boom', 'Ghost Phonk'],
    metal: ['Iron Doom', 'Void Metal', 'Crypt Core', 'Ash Metal', 'Storm Metal', 'Grave Core'],
    folk: ['Hearth Folk', 'Pale Folk', 'River Folk', 'Hollow Folk', 'Birch Folk', 'Briar Folk'],
    brazilroots: ['Soft Samba', 'Rio Bossa', 'Verde Samba', 'Sol Samba', 'Lazy Bossa'],
    asia: ['Neo Seoul', 'Tokyo Wave', 'Pastel Pop', 'Hyper Seoul', 'Shibuya Gold'],
  };

  const CLIP_MS = 20000;       // each clip plays 20s
  const CLIPS = 3;             // up to 3 clips per round
  const TIERS = [1000, 600, 300]; // points by song: 1st / 2nd / 3rd clip
  const FETCH_TIMEOUT = 7000;

  // ====================================================================
  //  DOM
  // ====================================================================
  const views = {
    home: document.getElementById('vHome'),
    help: document.getElementById('vHelp'),
    chapter: document.getElementById('vChapter'),
    loading: document.getElementById('vLoading'),
    error: document.getElementById('vError'),
    round: document.getElementById('vRound'),
    reveal: document.getElementById('vReveal'),
    chapterEnd: document.getElementById('vChapterEnd'),
  };
  const stageEl = document.getElementById('stage');
  const chapterList = document.getElementById('chapterList');
  const chBackBtn = document.getElementById('chBackBtn');
  const chBeginBtn = document.getElementById('chBeginBtn');
  const retryBtn = document.getElementById('retryBtn');
  const skipBtn = document.getElementById('skipBtn');
  const helpBtn = document.getElementById('helpBtn');
  const helpDoneBtn = document.getElementById('helpDoneBtn');
  const shareBtn = document.getElementById('shareBtn');
  const nextBtn = document.getElementById('nextBtn');
  const ceBackBtn = document.getElementById('ceBackBtn');

  const chKicker = document.getElementById('chKicker');
  const chTitle = document.getElementById('chTitle');
  const chScene = document.getElementById('chScene');
  const chIntro = document.getElementById('chIntro');
  const pbFill = document.getElementById('pbFill');
  const songTag = document.getElementById('songTag');
  const askEl = document.getElementById('ask');
  const eqEl = document.getElementById('eq');
  const optionsEl = document.getElementById('options');
  const errorText = document.getElementById('errorText');

  const verdictEl = document.getElementById('verdict');
  const revPoints = document.getElementById('revPoints');
  const revName = document.getElementById('revName');
  const revMeta = document.getElementById('revMeta');
  const revTrack = document.getElementById('revTrack');
  const revNote = document.getElementById('revNote');

  const ceTitle = document.getElementById('ceTitle');
  const ceOutro = document.getElementById('ceOutro');
  const ceScore = document.getElementById('ceScore');
  const ceGrade = document.getElementById('ceGrade');
  const ceGradeLabel = document.getElementById('ceGradeLabel');

  const footerStreak = document.getElementById('footerStreak');
  const bestEl = document.getElementById('bestScore');
  const player = document.getElementById('player');

  // ====================================================================
  //  State
  // ====================================================================
  let best = parseInt(localStorage.getItem('rt_best') || '0', 10);
  let streak = 0;
  let chapterIdx = 0, roundIdx = 0;
  let chapterScore = 0;
  let chapterCorrect = 0;
  let currentGrade = 'F';
  let answered = false;
  let audioCtx = null;
  let clips = [];              // resolved metas for the active round
  let clipIdx = 0;
  let timers = [];             // misc timeouts
  let clipTimer = null;        // auto-advance timer for the current clip
  let roundQueue = [];         // sequence of round indices for the chapter
  let roundGenre = null;
  let currentMeta = null;

  bestEl.textContent = best;

  // ====================================================================
  //  Helpers
  // ====================================================================
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  // One shuffled pass through the chapter's sub-genres (each played once).
  function buildQueue(ch) { return shuffle(ch.rounds.map((_, i) => i)); }
  function show(view) { Object.keys(views).forEach((k) => { views[k].hidden = k !== view; }); }
  function setTheme(pair) { stageEl.style.setProperty('--c1', pair[0]); stageEl.style.setProperty('--c2', pair[1]); }
  function chBestKey(ch) { return 'rt_best_' + ch.id; }
  function chGradeKey(ch) { return 'rt_grade_' + ch.id; }

  // Grade weights correctness most, with a speed bonus for early answers.
  const GRADE_LABELS = { A: 'Crate digger', B: 'Solid selector', C: 'Getting there', D: 'Back to the shop', F: 'Tin ear' };
  const GRADE_ORDER = ['F', 'D', 'C', 'B', 'A'];
  function gradeFor(score, correct, total) {
    const speed = correct ? score / (correct * 1000) : 0;          // 0.3 .. 1
    const pct = total ? (correct / total) * (0.6 + 0.4 * speed) * 100 : 0;
    let letter = 'F';
    if (pct >= 90) letter = 'A'; else if (pct >= 78) letter = 'B';
    else if (pct >= 64) letter = 'C'; else if (pct >= 48) letter = 'D';
    return { letter: letter, label: GRADE_LABELS[letter] };
  }
  function updateFooter() { footerStreak.textContent = streak; bestEl.textContent = best; }

  function jsonpSearch(term) {
    return new Promise((resolve, reject) => {
      const cb = 'itunescb_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      let settled = false;
      const cleanup = () => { delete window[cb]; script.remove(); clearTimeout(timer); };
      const timer = setTimeout(() => { if (settled) return; settled = true; cleanup(); reject(new Error('timeout')); }, FETCH_TIMEOUT);
      window[cb] = (data) => { if (settled) return; settled = true; cleanup(); resolve(data); };
      script.onerror = () => { if (settled) return; settled = true; cleanup(); reject(new Error('network')); };
      script.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&entity=song&limit=5&callback=' + cb;
      document.body.appendChild(script);
    });
  }
  async function resolveOne(track) {
    try {
      const data = await jsonpSearch(track.artist + ' ' + track.title);
      const hit = (data.results || []).find((r) => r.previewUrl);
      return hit || null;
    } catch (e) { return null; }
  }

  // ====================================================================
  //  Sound effects
  // ====================================================================
  const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  let audioUnlocked = false;
  function unlockAudio() {
    if (audioUnlocked) return;
    try {
      player.src = SILENT;
      const p = player.play();
      if (p && p.then) p.then(() => { audioUnlocked = true; try { player.pause(); player.currentTime = 0; } catch (_) {} }).catch(() => {});
      else audioUnlocked = true;
    } catch (_) {}
  }
  function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    unlockAudio();
  }
  function playBuzz() {
    try { ensureAudioCtx(); const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, now); osc.frequency.exponentialRampToValueAtTime(95, now + 0.32);
      gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.18, now + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain).connect(audioCtx.destination); osc.start(now); osc.stop(now + 0.42);
    } catch (_) {}
  }
  function playChime() {
    try { ensureAudioCtx(); const now = audioCtx.currentTime;
      [880, 1320, 1760].forEach((freq, i) => {
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.frequency.value = freq; osc.type = 'sine'; const start = now + i * 0.06;
        gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(0.22, start + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        osc.connect(gain).connect(audioCtx.destination); osc.start(start); osc.stop(start + 0.55);
      });
    } catch (_) {}
  }

  // ====================================================================
  //  Clip playback + points timer
  // ====================================================================
  function clearTimers() { clearTimeout(clipTimer); clipTimer = null; timers.forEach(clearTimeout); timers = []; }
  function stopAudio() { try { player.pause(); } catch (_) {} eqEl.classList.add('paused'); }

  // Play clip i and fill its segment of the playbar; auto-advance after 20s.
  function playClipAt(i) {
    clipIdx = i;
    currentMeta = clips[i];
    songTag.textContent = 'Song ' + (i + 1) + ' of ' + clips.length;
    try { player.src = clips[i].previewUrl; player.currentTime = 0; const p = player.play(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
    eqEl.classList.remove('paused');

    const N = clips.length;
    pbFill.style.transition = 'none';
    pbFill.style.width = (i / N * 100) + '%';
    void pbFill.offsetWidth;            // reflow so the transition restarts
    pbFill.style.transition = 'width ' + CLIP_MS + 'ms linear';
    pbFill.style.width = ((i + 1) / N * 100) + '%';

    clearTimeout(clipTimer);
    clipTimer = setTimeout(onClipEnd, CLIP_MS);
  }

  function onClipEnd() {
    if (answered) return;
    if (clipIdx < clips.length - 1) playClipAt(clipIdx + 1);
    else stopAudio();
  }

  function startSequence() { playClipAt(0); }

  // ====================================================================
  //  Flow
  // ====================================================================
  function buildHome() {
    chapterList.innerHTML = '';
    CHAPTERS.forEach((ch, i) => {
      const card = document.createElement('button');
      card.className = 'ch-card'; card.type = 'button';
      const num = document.createElement('span'); num.className = 'ch-num'; num.textContent = (i + 1);
      const body = document.createElement('div'); body.className = 'ch-body';
      const name = document.createElement('span'); name.className = 'ch-name'; name.textContent = ch.title;
      const meta = document.createElement('span'); meta.className = 'ch-meta'; meta.textContent = ch.scene;
      body.appendChild(name); body.appendChild(meta);
      const bestGrade = localStorage.getItem(chGradeKey(ch));
      const bv = document.createElement('span'); bv.className = 'ch-best'; bv.textContent = bestGrade ? ('Best ' + bestGrade) : 'New';
      const cc = CHAPTER_COLORS[ch.id] || HOME_COLORS;
      card.style.setProperty('--cc1', cc[0]); card.style.setProperty('--cc2', cc[1]);
      card.appendChild(num); card.appendChild(body); card.appendChild(bv);
      card.addEventListener('click', () => { ensureAudioCtx(); location.hash = ch.id; });
      chapterList.appendChild(card);
    });
  }

  function goHome() {
    clearTimers(); stopAudio();
    streak = 0; chapterScore = 0;
    setTheme(HOME_COLORS);
    buildHome(); updateFooter();
    show('home');
  }

  function openChapter(i) {
    chapterIdx = i; roundIdx = 0; chapterScore = 0; chapterCorrect = 0; streak = 0;
    const ch = CHAPTERS[i];
    roundQueue = buildQueue(ch);
    setTheme(CHAPTER_COLORS[ch.id] || HOME_COLORS);
    chKicker.textContent = 'Chapter ' + (i + 1) + ' / ' + CHAPTERS.length;
    chTitle.textContent = ch.title;
    chScene.textContent = ch.scene;
    chIntro.textContent = ch.intro;
    updateFooter();
    show('chapter');
  }

  async function loadRound() {
    clearTimers(); stopAudio();
    const ch = CHAPTERS[chapterIdx];
    if (!ch || roundIdx >= roundQueue.length) { showChapterEnd(); return; }
    answered = false;
    show('loading');
    const round = ch.rounds[roundQueue[roundIdx]];

    // resolve up to CLIPS previews from the round's tracks
    const candidates = shuffle(round.tracks);
    clips = [];
    for (let i = 0; i < candidates.length && clips.length < CLIPS; i++) {
      const meta = await resolveOne(candidates[i]);
      if (meta) clips.push(meta);
    }
    if (clips.length === 0) {
      errorText.textContent = 'Couldn’t load clips for this one (may not be on Apple Music). Skip it?';
      show('error');
      return;
    }

    renderOptions(round, ch);
    askEl.textContent = '';
    show('round');
    startSequence();
  }

  function pickFake(fam, exclude) {
    let pool = (FAKES[fam] || []).filter((f) => exclude.indexOf(f) < 0);
    if (!pool.length) pool = Object.keys(FAKES).reduce((a, k) => a.concat(FAKES[k]), []).filter((f) => exclude.indexOf(f) < 0);
    return shuffle(pool)[0] || 'Neon Step';
  }

  function renderOptions(round, ch) {
    roundGenre = round.genre;
    const fam = CHAPTER_FAM[ch.id];
    // 2 real decoys from the SAME family (believable), rotated for variety
    const reals = shuffle((FAMILY_GENRES[fam] || []).filter((g) => g !== round.genre)).slice(0, 2);
    // …plus one believable INVENTED genre matched to the family
    const fake = pickFake(fam, [round.genre].concat(reals));
    const choices = shuffle([round.genre].concat(reals).concat(fake));

    optionsEl.innerHTML = '';
    choices.forEach((g) => {
      const btn = document.createElement('button');
      btn.className = 'option'; btn.type = 'button'; btn.textContent = g;
      btn.addEventListener('click', () => handleGuess(g, round, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleGuess(choice, round, btn) {
    if (answered) return;

    // Correct — bank points (more for an earlier song) and reveal.
    if (choice === round.genre) {
      const award = TIERS[Math.min(clipIdx, TIERS.length - 1)];
      const rating = ['Perfect', 'Excellent', 'Good'][Math.min(clipIdx, 2)];
      answered = true;
      clearTimers(); stopAudio();
      Array.from(optionsEl.querySelectorAll('.option')).forEach((b) => {
        b.disabled = true;
        if (b.textContent === round.genre) b.classList.add('correct');
        else if (!b.classList.contains('eliminated')) b.classList.add('dim');
      });
      chapterScore += award; chapterCorrect += 1; streak += 1;
      if (streak > best) { best = streak; localStorage.setItem('rt_best', String(best)); }
      playChime(); updateFooter();
      setTimeout(() => showReveal(round, true, rating), 550);
      return;
    }

    // Wrong — cross out the button and play the next song on the playbar.
    playBuzz();
    btn.classList.add('wrong', 'eliminated');
    btn.disabled = true;

    if (clipIdx < clips.length - 1) {
      askEl.textContent = 'Wrong — try again';
      setTimeout(() => { if (!answered) askEl.textContent = ''; }, 1600);
      playClipAt(clipIdx + 1);
    } else {
      // out of songs — it's a miss; reveal the answer.
      answered = true;
      clearTimers(); stopAudio();
      const ans = Array.from(optionsEl.querySelectorAll('.option')).find((b) => b.textContent === round.genre);
      if (ans) ans.classList.add('correct');
      streak = 0; updateFooter();
      setTimeout(() => showReveal(round, false, 'Wrong'), 900);
    }
  }

  function showReveal(round, correct, rating) {
    verdictEl.textContent = rating;
    verdictEl.className = 'verdict ' + (correct ? 'good' : 'bad');
    revPoints.textContent = '';
    revName.textContent = round.genre;
    revMeta.textContent = CHAPTERS[chapterIdx].scene;
    if (currentMeta) {
      revTrack.innerHTML = 'You heard <b>' + escapeHtml(currentMeta.trackName || '') + '</b> — ' + escapeHtml(currentMeta.artistName || '');
      revTrack.hidden = false;
    } else { revTrack.hidden = true; }
    revNote.textContent = round.note || '';
    // lineage connection on the genre map
    const lin = document.getElementById('lineage');
    lin.innerHTML = (round.from && round.from.length) ? ('Descends from <b>' + round.from.map(escapeHtml).join(' + ') + '</b>') : '';

    const ch = CHAPTERS[chapterIdx];
    nextBtn.textContent = (roundIdx >= roundQueue.length - 1) ? 'Finish chapter' : 'Next';
    show('reveal');
  }

  function nextRound() { roundIdx += 1; loadRound(); }

  // ====================================================================
  //  Share (WhatsApp / native share sheet) with a generated result card
  // ====================================================================
  function makeShareImage(grade, title) {
    const c = document.createElement('canvas'); c.width = 1080; c.height = 1080;
    const x = c.getContext('2d');
    const cols = CHAPTER_COLORS[CHAPTERS[chapterIdx].id] || HOME_COLORS;
    const g = x.createLinearGradient(0, 0, 1080, 1080); g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]);
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);
    x.fillStyle = '#0d0b1a'; x.textAlign = 'center';
    x.font = '700 84px "Space Grotesk", Arial, sans-serif'; x.fillText('ROOTS', 540, 170);
    x.font = '600 34px Arial, sans-serif'; x.fillText('GUESS THE SUB-GENRE', 540, 226);
    x.font = '700 380px "Space Grotesk", Arial, sans-serif'; x.fillText(grade, 540, 690);
    x.font = '700 52px "Space Grotesk", Arial, sans-serif'; x.fillText(title, 540, 820);
    x.font = '500 38px Arial, sans-serif'; x.fillText(chapterCorrect + ' / ' + roundQueue.length + ' correct', 540, 884);
    return c;
  }

  function shareResult() {
    const ch = CHAPTERS[chapterIdx];
    const text = 'I scored ' + currentGrade + ' on ROOTS — guess the sub-genre 🎧';
    const url = location.href;
    const canvas = makeShareImage(currentGrade, ch.title);
    canvas.toBlob((blob) => {
      const file = blob ? new File([blob], 'roots-result.png', { type: 'image/png' }) : null;
      (async () => {
        try {
          if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], text: text + ' ' + url }); return;
          }
          if (navigator.share) { await navigator.share({ text: text, url: url }); return; }
        } catch (e) { return; } // user cancelled or share failed silently
        window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank');
      })();
    }, 'image/png');
  }

  function showChapterEnd() {
    clearTimers(); stopAudio();
    const ch = CHAPTERS[chapterIdx];
    const total = roundQueue.length;
    const g = gradeFor(chapterScore, chapterCorrect, total);
    currentGrade = g.letter;

    const prevGrade = localStorage.getItem(chGradeKey(ch));
    const isBest = !prevGrade || GRADE_ORDER.indexOf(g.letter) > GRADE_ORDER.indexOf(prevGrade);
    if (isBest) localStorage.setItem(chGradeKey(ch), g.letter);

    ceGrade.textContent = g.letter;
    ceGradeLabel.textContent = g.label + (isBest ? ' · new best!' : '');
    ceTitle.textContent = ch.title;
    ceScore.textContent = chapterCorrect + ' / ' + total + ' correct';
    ceOutro.textContent = ch.outro;
    show('chapterEnd');
  }

  // ====================================================================
  //  Deep linking — the URL hash (#chapter-id) routes to a chapter.
  // ====================================================================
  function navHome() {
    if (location.hash) history.pushState(null, '', location.pathname + location.search);
    goHome();
  }
  function applyRoute() {
    const id = decodeURIComponent((location.hash || '').replace(/^#\/?/, ''));
    const i = CHAPTERS.findIndex((c) => c.id === id);
    if (i >= 0) openChapter(i); else goHome();
  }

  // ====================================================================
  //  Events
  // ====================================================================
  chBeginBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  chBackBtn.addEventListener('click', navHome);
  retryBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  skipBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  nextBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  ceBackBtn.addEventListener('click', navHome);
  helpBtn.addEventListener('click', () => show('help'));
  helpDoneBtn.addEventListener('click', () => { localStorage.setItem('rt_help', '1'); goHome(); });
  shareBtn.addEventListener('click', shareResult);
  window.addEventListener('hashchange', applyRoute);
  window.addEventListener('popstate', applyRoute);

  player.addEventListener('playing', () => eqEl.classList.remove('paused'));
  player.addEventListener('pause', () => eqEl.classList.add('paused'));
  player.addEventListener('ended', () => eqEl.classList.add('paused'));
  player.addEventListener('error', () => {
    // a clip URL failed — jump to the next available clip if there is one
    if (!answered && clips.length > 1 && clipIdx < clips.length - 1) playClipAt(clipIdx + 1);
  });

  // ---- Init ----
  setTheme(HOME_COLORS);
  updateFooter();
  if (!location.hash && !localStorage.getItem('rt_help')) { buildHome(); show('help'); }
  else applyRoute();   // deep-link straight to a chapter if the hash names one
})();
