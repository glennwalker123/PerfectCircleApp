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
      id: 'hcc', title: 'The Hardcore Continuum', scene: 'London · 1991–2020',
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
      id: 'house', title: 'Four to the Floor', scene: 'Chicago · 1977–2010',
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
      id: 'techno', title: 'The Techno Tree', scene: 'Detroit & beyond · 1985–2010',
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
      id: 'punk', title: 'The Punk Tree', scene: 'USA & UK · 1976–2000',
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
      id: 'afterpunk', title: 'After Punk', scene: 'UK & USA · 1978–1991',
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
      id: 'metal', title: 'The Metal Tree', scene: 'Worldwide · 1980–2005',
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
      id: 'soundsystem', title: 'Sound System', scene: 'Jamaica → Latin America · 1962–2010',
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
      id: 'carioca', title: 'Funk Carioca', scene: 'Brazil · 1989–2020',
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
      id: 'sahouse', title: 'Township House', scene: 'South Africa · 1994–2022',
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
      id: 'hiphop', title: 'The Hip-Hop Lineage', scene: 'USA · 1979–2015',
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
  ];

  // Normalise tracks ({t,a} -> {title,artist}) and build the genre pool.
  const ALL_GENRES = [];
  CHAPTERS.forEach((ch) => ch.rounds.forEach((r) => {
    r.tracks = r.tracks.map((x) => ({ title: x.t, artist: x.a }));
    if (ALL_GENRES.indexOf(r.genre) < 0) ALL_GENRES.push(r.genre);
  }));

  const CLIP_MS = 20000;       // each clip plays 20s
  const CLIPS = 3;             // up to 3 clips per round
  const TIERS = [1000, 600, 300]; // points by phase: 4 options / 3 / 2
  const FETCH_TIMEOUT = 7000;

  // ====================================================================
  //  DOM
  // ====================================================================
  const views = {
    home: document.getElementById('vHome'),
    chapter: document.getElementById('vChapter'),
    loading: document.getElementById('vLoading'),
    error: document.getElementById('vError'),
    round: document.getElementById('vRound'),
    reveal: document.getElementById('vReveal'),
    chapterEnd: document.getElementById('vChapterEnd'),
  };
  const chapterList = document.getElementById('chapterList');
  const chBackBtn = document.getElementById('chBackBtn');
  const chBeginBtn = document.getElementById('chBeginBtn');
  const retryBtn = document.getElementById('retryBtn');
  const skipBtn = document.getElementById('skipBtn');
  const replayBtn = document.getElementById('replayBtn');
  const nextBtn = document.getElementById('nextBtn');
  const ceBackBtn = document.getElementById('ceBackBtn');

  const chKicker = document.getElementById('chKicker');
  const chTitle = document.getElementById('chTitle');
  const chScene = document.getElementById('chScene');
  const chIntro = document.getElementById('chIntro');
  const clipTag = document.getElementById('clipTag');
  const pbFill = document.getElementById('pbFill');
  const pbHint = document.getElementById('pbHint');
  const playStateEl = document.getElementById('playState');
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

  const scoreStat = document.getElementById('scoreStat');
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
  let answered = false;
  let audioCtx = null;
  let clips = [];              // resolved metas for the active round
  let clipIdx = 0;
  let timers = [];             // clip-advance + option-removal timeouts
  let phase = 0;               // 0 = 4 options, 1 = 3 options, 2 = 2 options
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
  function show(view) { Object.keys(views).forEach((k) => { views[k].hidden = k !== view; }); }
  function chBestKey(ch) { return 'rt_best_' + ch.id; }
  function updateFooter() { scoreStat.textContent = chapterScore; footerStreak.textContent = streak; bestEl.textContent = best; }

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
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function stopAudio() { try { player.pause(); } catch (_) {} eqEl.classList.add('paused'); }

  function playClip(i) {
    clipIdx = i;
    currentMeta = clips[i];
    clipTag.textContent = 'Clip ' + (i + 1) + ' of ' + clips.length;
    try { player.src = clips[i].previewUrl; player.currentTime = 0; const p = player.play(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
    eqEl.classList.remove('paused');
    if (!answered) playStateEl.textContent = 'Listening…';
  }

  // Remove one still-visible WRONG option (keeps the answer + at least one decoy).
  function removeOneOption() {
    const wrong = Array.from(optionsEl.querySelectorAll('.option'))
      .filter((b) => !b.classList.contains('eliminated') && b.textContent !== roundGenre);
    if (wrong.length <= 1) return; // always leave the answer + one decoy
    const victim = wrong[Math.floor(Math.random() * wrong.length)];
    victim.classList.add('eliminated');
    victim.disabled = true;
  }

  function startSequence() {
    phase = 0;
    const windowMs = clips.length * CLIP_MS;

    // playbar fill across the whole window
    pbFill.style.transition = 'none';
    pbFill.style.width = '0%';
    // force reflow so the transition restarts cleanly
    void pbFill.offsetWidth;
    pbFill.style.transition = 'width ' + windowMs + 'ms linear';
    pbFill.style.width = '100%';
    pbHint.textContent = '4 options · answer early for more points';

    playClip(0);
    // advance clips
    for (let i = 1; i < clips.length; i++) {
      timers.push(setTimeout(() => { if (!answered) playClip(i); }, i * CLIP_MS));
    }
    // option removals at each third of the bar (1/3 and 2/3)
    timers.push(setTimeout(() => { if (answered) return; phase = 1; removeOneOption(); pbHint.textContent = '3 options left'; }, windowMs / 3));
    timers.push(setTimeout(() => { if (answered) return; phase = 2; removeOneOption(); pbHint.textContent = '2 options left'; }, (windowMs * 2) / 3));
    // end of clips
    timers.push(setTimeout(() => { if (!answered) { stopAudio(); playStateEl.textContent = 'Make your guess'; } }, windowMs));
  }

  function replayClip() {
    try { player.currentTime = 0; const p = player.play(); if (p && p.catch) p.catch(() => {}); eqEl.classList.remove('paused'); } catch (_) {}
  }

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
      const bestVal = parseInt(localStorage.getItem(chBestKey(ch)) || '0', 10);
      const bv = document.createElement('span'); bv.className = 'ch-best'; bv.textContent = bestVal ? (bestVal + ' pts') : 'New';
      card.appendChild(num); card.appendChild(body); card.appendChild(bv);
      card.addEventListener('click', () => { ensureAudioCtx(); openChapter(i); });
      chapterList.appendChild(card);
    });
  }

  function goHome() {
    clearTimers(); stopAudio();
    streak = 0; chapterScore = 0;
    buildHome(); updateFooter();
    show('home');
  }

  function openChapter(i) {
    chapterIdx = i; roundIdx = 0; chapterScore = 0; streak = 0;
    const ch = CHAPTERS[i];
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
    if (!ch || roundIdx >= ch.rounds.length) { showChapterEnd(); return; }
    answered = false;
    show('loading');
    const round = ch.rounds[roundIdx];

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
    show('round');
    playStateEl.textContent = 'Listening…';
    startSequence();
  }

  function renderOptions(round, ch) {
    roundGenre = round.genre;
    const siblings = shuffle(ch.rounds.map((r) => r.genre).filter((g) => g !== round.genre));
    const outside = shuffle(ALL_GENRES.filter((g) => g !== round.genre && siblings.indexOf(g) < 0));
    const distractors = siblings.concat(outside).slice(0, 3);
    const choices = shuffle([round.genre].concat(distractors));
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
    const award = TIERS[Math.min(phase, TIERS.length - 1)];
    answered = true;
    clearTimers(); stopAudio();

    const correct = choice === round.genre;
    Array.from(optionsEl.querySelectorAll('.option')).forEach((b) => {
      b.disabled = true;
      if (b.textContent === round.genre) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    let gained = 0;
    if (correct) {
      gained = award; chapterScore += award; streak += 1;
      if (streak > best) { best = streak; localStorage.setItem('rt_best', String(best)); }
      playChime();
    } else { streak = 0; playBuzz(); }
    updateFooter();
    setTimeout(() => showReveal(round, correct, gained), 550);
  }

  function showReveal(round, correct, gained) {
    verdictEl.textContent = correct ? 'Correct' : 'Not quite';
    verdictEl.className = 'verdict ' + (correct ? 'good' : 'bad');
    revPoints.textContent = correct ? ('+' + gained) : '';
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
    nextBtn.textContent = (roundIdx >= ch.rounds.length - 1) ? 'Finish chapter' : 'Next track';
    show('reveal');
  }

  function nextRound() { roundIdx += 1; loadRound(); }

  function showChapterEnd() {
    clearTimers(); stopAudio();
    const ch = CHAPTERS[chapterIdx];
    const prevBest = parseInt(localStorage.getItem(chBestKey(ch)) || '0', 10);
    if (chapterScore > prevBest) localStorage.setItem(chBestKey(ch), String(chapterScore));
    ceTitle.textContent = ch.title;
    ceOutro.textContent = ch.outro;
    ceScore.textContent = 'You scored ' + chapterScore + ' pts' + (chapterScore > prevBest ? ' — new best!' : (prevBest ? ' (best ' + prevBest + ')' : ''));
    show('chapterEnd');
  }

  // ====================================================================
  //  Events
  // ====================================================================
  chBeginBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  chBackBtn.addEventListener('click', goHome);
  retryBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  skipBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  replayBtn.addEventListener('click', () => { ensureAudioCtx(); replayClip(); });
  nextBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  ceBackBtn.addEventListener('click', goHome);

  player.addEventListener('playing', () => eqEl.classList.remove('paused'));
  player.addEventListener('pause', () => eqEl.classList.add('paused'));
  player.addEventListener('ended', () => eqEl.classList.add('paused'));
  player.addEventListener('error', () => {
    // a clip URL failed — jump to the next available clip if there is one
    if (!answered && clips.length > 1 && clipIdx < clips.length - 1) playClip(clipIdx + 1);
  });

  // ---- Init ----
  buildHome();
  updateFooter();
  show('home');
})();
