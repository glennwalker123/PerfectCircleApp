(function () {
  'use strict';

  // ====================================================================
  //  Clusters (Musicmap-style super-genre groupings) + colors
  // ====================================================================
  const CLUSTERS = [
    { id: 'bluenote', label: 'Blue Note', color: '#5b9cff' },
    { id: 'rock',     label: 'Rock',      color: '#f2c14e' },
    { id: 'jamaica',  label: 'Jamaica',   color: '#3fb37f' },
    { id: 'hiphop',   label: 'Hip-Hop',   color: '#ff9f4f' },
    { id: 'edm',      label: 'Electronic',color: '#ff6b7a' },
    { id: 'global',   label: 'Global',    color: '#a06bff' },
  ];
  const CLUSTER_COLOR = {};
  CLUSTERS.forEach((c) => { CLUSTER_COLOR[c.id] = c.color; });

  // ====================================================================
  //  The graph: sub-genre nodes. `influencedBy` defines the lineage;
  //  forward edges (`influenced`) are computed from it. Shared ancestors
  //  branch into several descendants, weaving one interconnected map.
  // ====================================================================
  const NODES = [
    { id: 'blues', label: 'Blues', cluster: 'bluenote', era: 1903, scene: 'Mississippi Delta, USA',
      influencedBy: [],
      blurb: 'Born from African-American work songs and spirituals in the Deep South, the blues gave popular music its 12-bar form, bent notes and storytelling soul — the taproot of nearly everything that followed.',
      tracks: [ { title: 'Cross Road Blues', artist: 'Robert Johnson' }, { title: 'Hoochie Coochie Man', artist: 'Muddy Waters' }, { title: 'Smokestack Lightnin\'', artist: 'Howlin\' Wolf' }, { title: 'The Thrill Is Gone', artist: 'B.B. King' } ] },

    { id: 'jazz', label: 'Jazz', cluster: 'bluenote', era: 1917, scene: 'New Orleans, USA',
      influencedBy: ['blues'],
      blurb: 'New Orleans fused blues, ragtime and brass-band music into a swinging, improvised art form that conquered the world and seeded bebop, R&B and beyond.',
      tracks: [ { title: 'Take the A Train', artist: 'Duke Ellington' }, { title: 'What a Wonderful World', artist: 'Louis Armstrong' }, { title: 'So What', artist: 'Miles Davis' } ] },

    { id: 'gospel', label: 'Gospel', cluster: 'bluenote', era: 1930, scene: 'African-American churches, USA',
      influencedBy: [],
      blurb: 'The fervent vocal call-and-response of the Black church — soaring melisma and hand-clap rhythm — that would pour straight into soul music.',
      tracks: [ { title: 'How I Got Over', artist: 'Mahalia Jackson' }, { title: 'Up Above My Head', artist: 'Sister Rosetta Tharpe' }, { title: 'Uncloudy Day', artist: 'The Staple Singers' } ] },

    { id: 'bebop', label: 'Bebop', cluster: 'bluenote', era: 1945, scene: 'New York City, USA',
      influencedBy: ['jazz'],
      blurb: 'A fast, virtuosic, harmonically daring rebellion against big-band swing — jazz reimagined as serious art music.',
      tracks: [ { title: 'Ornithology', artist: 'Charlie Parker' }, { title: 'A Night in Tunisia', artist: 'Dizzy Gillespie' }, { title: '\'Round Midnight', artist: 'Thelonious Monk' } ] },

    { id: 'rnb', label: 'Rhythm & Blues', cluster: 'bluenote', era: 1948, scene: 'USA',
      influencedBy: ['blues', 'jazz'],
      blurb: 'Electrified, up-tempo blues built for dancing — the immediate parent of both rock ’n’ roll and soul.',
      tracks: [ { title: 'I Got a Woman', artist: 'Ray Charles' }, { title: 'Choo Choo Ch\'Boogie', artist: 'Louis Jordan' }, { title: '(Mama) He Treats Your Daughter Mean', artist: 'Ruth Brown' } ] },

    { id: 'soul', label: 'Soul', cluster: 'bluenote', era: 1961, scene: 'Detroit & Memphis, USA',
      influencedBy: ['gospel', 'rnb'],
      blurb: 'Gospel passion meeting R&B grooves at Motown and Stax — the sound of the civil-rights era, and the launch pad for funk.',
      tracks: [ { title: 'Respect', artist: 'Aretha Franklin' }, { title: '(Sittin\' On) The Dock of the Bay', artist: 'Otis Redding' }, { title: 'A Change Is Gonna Come', artist: 'Sam Cooke' }, { title: 'What\'s Going On', artist: 'Marvin Gaye' } ] },

    { id: 'funk', label: 'Funk', cluster: 'bluenote', era: 1969, scene: 'USA',
      influencedBy: ['soul'],
      blurb: 'James Brown stripped soul down to "the One" — syncopated, bass-heavy and relentless. Its breakbeats would later be sampled into existence as hip-hop and disco.',
      tracks: [ { title: 'Get Up (I Feel Like Being a) Sex Machine', artist: 'James Brown' }, { title: 'Give Up the Funk (Tear the Roof off the Sucker)', artist: 'Parliament' }, { title: 'Thank You (Falettinme Be Mice Elf Agin)', artist: 'Sly & The Family Stone' }, { title: 'Cissy Strut', artist: 'The Meters' } ] },

    // ---- Rock cluster ----
    { id: 'rocknroll', label: 'Rock ’n’ Roll', cluster: 'rock', era: 1955, scene: 'USA',
      influencedBy: ['blues', 'rnb'],
      blurb: 'When R&B crossed over to teenage America, rock ’n’ roll was born — backbeat, guitar and rebellion in one three-minute jolt.',
      tracks: [ { title: 'Johnny B. Goode', artist: 'Chuck Berry' }, { title: 'Tutti Frutti', artist: 'Little Richard' }, { title: 'Jailhouse Rock', artist: 'Elvis Presley' } ] },

    { id: 'rock', label: 'Rock', cluster: 'rock', era: 1965, scene: 'UK & USA',
      influencedBy: ['rocknroll'],
      blurb: 'The British Invasion and beyond turned rock ’n’ roll into albums-as-art, splitting into countless strains — and eventually into punk and metal.',
      tracks: [ { title: '(I Can\'t Get No) Satisfaction', artist: 'The Rolling Stones' }, { title: 'Come Together', artist: 'The Beatles' }, { title: 'Whole Lotta Love', artist: 'Led Zeppelin' }, { title: 'Baba O\'Riley', artist: 'The Who' } ] },

    { id: 'metal', label: 'Heavy Metal', cluster: 'rock', era: 1970, scene: 'Birmingham, UK',
      influencedBy: ['rock'],
      blurb: 'Black Sabbath slowed the blues down, cranked the distortion and tuned to doom — heavier, darker, louder rock.',
      tracks: [ { title: 'Paranoid', artist: 'Black Sabbath' }, { title: 'Enter Sandman', artist: 'Metallica' }, { title: 'The Trooper', artist: 'Iron Maiden' } ] },

    { id: 'punk', label: 'Punk', cluster: 'rock', era: 1976, scene: 'New York & London',
      influencedBy: ['rock'],
      blurb: 'Fast, short, three-chord fury — punk tore up rock’s excess and handed music back to anyone with an attitude.',
      tracks: [ { title: 'Blitzkrieg Bop', artist: 'Ramones' }, { title: 'Anarchy in the U.K.', artist: 'Sex Pistols' }, { title: 'London Calling', artist: 'The Clash' } ] },

    // ---- Jamaica ----
    { id: 'ska', label: 'Ska', cluster: 'jamaica', era: 1962, scene: 'Kingston, Jamaica',
      influencedBy: [],
      blurb: 'Jamaica’s first homegrown pop: a skipping offbeat guitar over jumped-up R&B, soundtracking independence.',
      tracks: [ { title: 'Guns of Navarone', artist: 'The Skatalites' }, { title: 'Israelites', artist: 'Desmond Dekker' }, { title: '54-46 Was My Number', artist: 'Toots & The Maytals' } ] },

    { id: 'rocksteady', label: 'Rocksteady', cluster: 'jamaica', era: 1966, scene: 'Jamaica',
      influencedBy: ['ska'],
      blurb: 'Ska slowed to a cool, romantic crawl — the bass stepped forward, paving the way for reggae.',
      tracks: [ { title: 'Get Ready - Rock Steady', artist: 'Alton Ellis' }, { title: 'The Tide Is High', artist: 'The Paragons' }, { title: 'Everything I Own', artist: 'Ken Boothe' } ] },

    { id: 'reggae', label: 'Reggae', cluster: 'jamaica', era: 1968, scene: 'Jamaica',
      influencedBy: ['rocksteady'],
      blurb: 'The one-drop rhythm and Rastafari message that carried Jamaican music worldwide — and split into dub and dancehall.',
      tracks: [ { title: 'Could You Be Loved', artist: 'Bob Marley & The Wailers' }, { title: 'Pressure Drop', artist: 'Toots & The Maytals' }, { title: 'The Harder They Come', artist: 'Jimmy Cliff' } ] },

    { id: 'dub', label: 'Dub', cluster: 'jamaica', era: 1973, scene: 'Jamaica',
      influencedBy: ['reggae'],
      blurb: 'Engineers like King Tubby remixed reggae into echo-drenched, bass-heavy instrumentals — inventing the remix, the producer-as-artist, and the DNA of hip-hop and jungle.',
      tracks: [ { title: 'King Tubby Meets Rockers Uptown', artist: 'Augustus Pablo' }, { title: 'Blackboard Jungle Dub', artist: 'Lee “Scratch” Perry' }, { title: 'Dub Fi Gwan', artist: 'King Tubby' } ] },

    { id: 'dancehall', label: 'Dancehall', cluster: 'jamaica', era: 1982, scene: 'Jamaica',
      influencedBy: ['reggae'],
      blurb: 'Reggae went digital and DJ-led — sparse riddims and rapid-fire toasting that fed straight into hip-hop, jungle and grime.',
      tracks: [ { title: 'Under Mi Sleng Teng', artist: 'Wayne Smith' }, { title: 'Mr. Loverman', artist: 'Shabba Ranks' }, { title: 'Get Busy', artist: 'Sean Paul' } ] },

    // ---- Hip-Hop ----
    { id: 'oldschool', label: 'Old-School Hip-Hop', cluster: 'hiphop', era: 1979, scene: 'The Bronx, NYC',
      influencedBy: ['funk', 'disco', 'dub'],
      blurb: 'Bronx DJs looped funk and disco breaks while MCs rhymed over them — a party trick that became a global culture. The sound-system art owed a debt to Jamaican dub.',
      tracks: [ { title: 'Rapper\'s Delight', artist: 'The Sugarhill Gang' }, { title: 'The Message', artist: 'Grandmaster Flash & The Furious Five' }, { title: 'Planet Rock', artist: 'Afrika Bambaataa' } ] },

    { id: 'boombap', label: 'Boom Bap', cluster: 'hiphop', era: 1992, scene: 'New York City',
      influencedBy: ['oldschool'],
      blurb: 'The golden-age East Coast sound: hard, dusty drum breaks and jazz/soul samples under lyrical density.',
      tracks: [ { title: 'N.Y. State of Mind', artist: 'Nas' }, { title: 'C.R.E.A.M.', artist: 'Wu-Tang Clan' }, { title: 'Juicy', artist: 'The Notorious B.I.G.' }, { title: 'Scenario', artist: 'A Tribe Called Quest' } ] },

    { id: 'trap', label: 'Trap', cluster: 'hiphop', era: 2003, scene: 'Atlanta, USA',
      influencedBy: ['boombap'],
      blurb: 'Southern hip-hop built on booming 808s, rattling hi-hats and cinematic synths — the dominant pop sound of the 2010s.',
      tracks: [ { title: 'Rubber Band Man', artist: 'T.I.' }, { title: 'Mask Off', artist: 'Future' }, { title: 'Bad and Boujee', artist: 'Migos' } ] },

    { id: 'usdrill', label: 'Drill (US)', cluster: 'hiphop', era: 2012, scene: 'Chicago, USA',
      influencedBy: ['trap'],
      blurb: 'Chicago’s bleak, menacing offshoot of trap — sparse and ominous, it would soon be reshaped an ocean away in London.',
      tracks: [ { title: 'Love Sosa', artist: 'Chief Keef' }, { title: 'L\'s Anthem', artist: 'Lil Durk' }, { title: 'Computers', artist: 'Rocko' } ] },

    // ---- Electronic / Dance ----
    { id: 'disco', label: 'Disco', cluster: 'edm', era: 1974, scene: 'New York City',
      influencedBy: ['funk'],
      blurb: 'Funk and soul reborn for the dancefloor with a four-on-the-floor kick and lush strings — the club blueprint that house would inherit.',
      tracks: [ { title: 'Le Freak', artist: 'Chic' }, { title: 'I Feel Love', artist: 'Donna Summer' }, { title: 'September', artist: 'Earth, Wind & Fire' }, { title: 'I Will Survive', artist: 'Gloria Gaynor' } ] },

    { id: 'house', label: 'House', cluster: 'edm', era: 1984, scene: 'Chicago, USA',
      influencedBy: ['disco'],
      blurb: 'When disco "died," Chicago DJs rebuilt it from drum machines at the Warehouse club — the 4/4 pulse that powers dance music to this day.',
      tracks: [ { title: 'Your Love', artist: 'Frankie Knuckles' }, { title: 'Move Your Body', artist: 'Marshall Jefferson' }, { title: 'Jack Your Body', artist: 'Steve “Silk” Hurley' } ] },

    { id: 'techno', label: 'Techno', cluster: 'edm', era: 1985, scene: 'Detroit, USA',
      influencedBy: ['house'],
      blurb: 'Detroit’s futurists married house’s pulse to robotic, sci-fi machine-funk — colder, harder and purely electronic.',
      tracks: [ { title: 'Strings of Life', artist: 'Derrick May' }, { title: 'No UFO\'s', artist: 'Model 500' }, { title: 'The Bells', artist: 'Jeff Mills' } ] },

    { id: 'acidhouse', label: 'Acid House', cluster: 'edm', era: 1987, scene: 'Chicago & UK',
      influencedBy: ['house'],
      blurb: 'The squelch of the Roland TB-303 turned house psychedelic — the spark of the UK’s late-’80s rave explosion.',
      tracks: [ { title: 'Acid Tracks', artist: 'Phuture' }, { title: 'Pacific State', artist: '808 State' }, { title: 'Voodoo Ray', artist: 'A Guy Called Gerald' } ] },

    { id: 'trance', label: 'Trance', cluster: 'edm', era: 1992, scene: 'Germany',
      influencedBy: ['techno', 'acidhouse'],
      blurb: 'Hypnotic, melodic and euphoric — techno’s arpeggios stretched into epic, festival-sized builds.',
      tracks: [ { title: 'Children', artist: 'Robert Miles' }, { title: '9 PM (Till I Come)', artist: 'ATB' }, { title: 'For an Angel', artist: 'Paul van Dyk' } ] },

    { id: 'breakbeat', label: 'Breakbeat Hardcore', cluster: 'edm', era: 1991, scene: 'UK',
      influencedBy: ['acidhouse'],
      blurb: 'UK rave sped acid house up and chopped in funk breakbeats and ragga samples — the immediate ancestor of jungle.',
      tracks: [ { title: 'Charly', artist: 'The Prodigy' }, { title: 'Activ-8 (Come with Me)', artist: 'Altern 8' }, { title: 'On a Ragga Tip', artist: 'SL2' } ] },

    { id: 'jungle', label: 'Jungle', cluster: 'edm', era: 1993, scene: 'London, UK',
      influencedBy: ['breakbeat', 'dub', 'dancehall'],
      blurb: 'Frenetic chopped breakbeats over deep reggae sub-bass — a wholly British fusion of rave energy and Jamaican sound-system culture.',
      tracks: [ { title: 'Original Nuttah', artist: 'UK Apache & Shy FX' }, { title: 'Incredible', artist: 'M-Beat' }, { title: 'Inner City Life', artist: 'Goldie' } ] },

    { id: 'dnb', label: 'Drum & Bass', cluster: 'edm', era: 1995, scene: 'UK',
      influencedBy: ['jungle'],
      blurb: 'Jungle refined and accelerated to ~170bpm — engineered, sleek and bass-driven, it became a global electronic staple.',
      tracks: [ { title: 'Brown Paper Bag', artist: 'Roni Size / Reprazent' }, { title: 'Timeless', artist: 'Goldie' }, { title: 'Tarantula', artist: 'Pendulum' } ] },

    { id: 'ukgarage', label: 'UK Garage', cluster: 'edm', era: 1997, scene: 'London, UK',
      influencedBy: ['dnb', 'house'],
      blurb: 'Soulful, skippy 2-step rhythms with chopped vocals and sub-bass — the sound of late-’90s London that would harden into grime.',
      tracks: [ { title: 'Re-Rewind (The Crowd Say Bo Selecta)', artist: 'Artful Dodger' }, { title: 'Crazy Love', artist: 'MJ Cole' }, { title: 'Sweet Like Chocolate', artist: 'Shanks & Bigfoot' } ] },

    { id: 'grime', label: 'Grime', cluster: 'edm', era: 2002, scene: 'East London, UK',
      influencedBy: ['ukgarage', 'dancehall'],
      blurb: 'Garage gone dark and aggressive at 140bpm, with rapid MCing — a raw, homegrown London sound carrying dancehall’s DJ-clash spirit.',
      tracks: [ { title: 'I Luv U', artist: 'Dizzee Rascal' }, { title: 'Eskimo', artist: 'Wiley' }, { title: 'Shutdown', artist: 'Skepta' } ] },

    { id: 'ukdrill', label: 'Drill (UK)', cluster: 'edm', era: 2015, scene: 'South London, UK',
      influencedBy: ['grime', 'usdrill'],
      blurb: 'London took Chicago drill’s menace, swapped in sliding 808s and grime’s cadence, and made it the defining UK street sound of the late 2010s.',
      tracks: [ { title: 'Know Better', artist: 'Headie One' }, { title: 'No Hook', artist: 'Digga D' }, { title: 'Day in the Life', artist: 'Central Cee' } ] },

    // ---- Rock cluster — niche / alternative branches ----
    { id: 'newwave', label: 'New Wave', cluster: 'rock', era: 1978, scene: 'UK & USA',
      influencedBy: ['punk'],
      blurb: 'Punk’s energy channelled into art-school hooks, synths and style — quirky, danceable and built for radio.',
      tracks: [ { title: 'Once in a Lifetime', artist: 'Talking Heads' }, { title: 'Heart of Glass', artist: 'Blondie' }, { title: 'Whip It', artist: 'Devo' } ] },

    { id: 'postpunk', label: 'Post-Punk', cluster: 'rock', era: 1979, scene: 'UK',
      influencedBy: ['punk'],
      blurb: 'Punk turned inward and experimental — angular guitars, dub-deep basslines and cold, searching atmospheres.',
      tracks: [ { title: 'Love Will Tear Us Apart', artist: 'Joy Division' }, { title: 'Damaged Goods', artist: 'Gang of Four' }, { title: 'Hong Kong Garden', artist: 'Siouxsie and the Banshees' } ] },

    { id: 'hardcorepunk', label: 'Hardcore Punk', cluster: 'rock', era: 1981, scene: 'USA',
      influencedBy: ['punk'],
      blurb: 'Punk taken to its limit — faster, harder, shorter — and forged into a fiercely independent DIY scene.',
      tracks: [ { title: 'Rise Above', artist: 'Black Flag' }, { title: 'Pay to Cum', artist: 'Bad Brains' }, { title: 'Minor Threat', artist: 'Minor Threat' } ] },

    { id: 'emo', label: 'Emo', cluster: 'rock', era: 1985, scene: 'Washington, D.C.',
      influencedBy: ['hardcorepunk'],
      blurb: 'Hardcore’s aggression turned confessional — "emotional hardcore" trading slogans for raw, personal catharsis.',
      tracks: [ { title: 'Seven', artist: 'Sunny Day Real Estate' }, { title: 'Accident Prone', artist: 'Jawbreaker' }, { title: 'For Want Of', artist: 'Rites of Spring' } ] },

    { id: 'grunge', label: 'Grunge', cluster: 'rock', era: 1989, scene: 'Seattle, USA',
      influencedBy: ['punk', 'metal'],
      blurb: 'Punk attitude, metal weight and pop melody fused in the Pacific Northwest — loud-quiet-loud and flannel-clad.',
      tracks: [ { title: 'Smells Like Teen Spirit', artist: 'Nirvana' }, { title: 'Alive', artist: 'Pearl Jam' }, { title: 'Black Hole Sun', artist: 'Soundgarden' }, { title: 'Would?', artist: 'Alice in Chains' } ] },

    { id: 'shoegaze', label: 'Shoegaze', cluster: 'rock', era: 1990, scene: 'UK',
      influencedBy: ['postpunk', 'newwave'],
      blurb: 'Walls of blurred, effect-drenched guitar over dreamy melodies — overwhelming and gorgeous, eyes on the pedals.',
      tracks: [ { title: 'Only Shallow', artist: 'My Bloody Valentine' }, { title: 'Alison', artist: 'Slowdive' }, { title: 'Vapour Trail', artist: 'Ride' } ] },

    { id: 'poppunk', label: 'Pop-Punk', cluster: 'rock', era: 1994, scene: 'California, USA',
      influencedBy: ['punk'],
      blurb: 'Punk’s three chords made bright, fast and catchy — bratty hooks built for radio and skateparks.',
      tracks: [ { title: 'Basket Case', artist: 'Green Day' }, { title: 'All the Small Things', artist: 'blink-182' }, { title: 'Self Esteem', artist: 'The Offspring' } ] },

    { id: 'skapunk', label: 'Ska Punk', cluster: 'rock', era: 1995, scene: 'California, USA',
      influencedBy: ['hardcorepunk', 'ska'],
      blurb: 'Jamaican ska’s offbeat skank welded to American punk speed and blaring horns — rowdy, sunny and fast.',
      tracks: [ { title: 'Santeria', artist: 'Sublime' }, { title: 'Sell Out', artist: 'Reel Big Fish' }, { title: 'The Impression That I Get', artist: 'The Mighty Mighty Bosstones' } ] },

    { id: 'numetal', label: 'Nu Metal', cluster: 'rock', era: 1996, scene: 'USA',
      influencedBy: ['metal', 'boombap', 'grunge'],
      blurb: 'Down-tuned metal riffs fused with hip-hop rhythm and rapped vocals — angsty, bouncy and inescapable around 2000.',
      tracks: [ { title: 'Freak on a Leash', artist: 'Korn' }, { title: 'One Step Closer', artist: 'Linkin Park' }, { title: 'Chop Suey!', artist: 'System of a Down' }, { title: 'Break Stuff', artist: 'Limp Bizkit' } ] },

    // ---- Electronic — niche offshoots ----
    { id: 'triphop', label: 'Trip-Hop', cluster: 'edm', era: 1994, scene: 'Bristol, UK',
      influencedBy: ['dub', 'boombap'],
      blurb: 'Hip-hop slowed to a smoky crawl with dub bass and cinematic gloom — the Bristol sound.',
      tracks: [ { title: 'Teardrop', artist: 'Massive Attack' }, { title: 'Glory Box', artist: 'Portishead' }, { title: 'Hell Is Round the Corner', artist: 'Tricky' } ] },

    { id: 'dubstep', label: 'Dubstep', cluster: 'edm', era: 2006, scene: 'South London, UK',
      influencedBy: ['ukgarage', 'dnb'],
      blurb: 'Garage’s skip stripped to half-time, with sub-bass wobble and cavernous space — then it exploded worldwide.',
      tracks: [ { title: 'Midnight Request Line', artist: 'Skream' }, { title: 'Archangel', artist: 'Burial' }, { title: 'Scary Monsters and Nice Sprites', artist: 'Skrillex' } ] },

    // ---- Global — cross-pollinated international genres ----
    { id: 'afrobeat', label: 'Afrobeat', cluster: 'global', era: 1971, scene: 'Lagos, Nigeria',
      influencedBy: ['funk', 'jazz'],
      blurb: 'Fela Kuti’s fusion of Yoruba rhythm, highlife horns, funk and jazz into sprawling, political grooves.',
      tracks: [ { title: 'Water No Get Enemy', artist: 'Fela Kuti' }, { title: 'Zombie', artist: 'Fela Kuti' }, { title: 'Secret Agent', artist: 'Tony Allen' } ] },

    { id: 'bailefunk', label: 'Baile Funk', cluster: 'global', era: 1989, scene: 'Rio de Janeiro, Brazil',
      influencedBy: ['oldschool'],
      blurb: 'Rio’s favela party music — Miami-bass beats and chanted vocals, raw, fast and relentless.',
      tracks: [ { title: 'Bum Bum Tam Tam', artist: 'MC Fioti' }, { title: 'Vai Malandra', artist: 'Anitta' }, { title: 'Olha a Explosão', artist: 'MC Kevinho' } ] },

    { id: 'reggaeton', label: 'Reggaeton', cluster: 'global', era: 1994, scene: 'Puerto Rico & Panama',
      influencedBy: ['dancehall', 'boombap'],
      blurb: 'Jamaican dancehall’s dembow riddim crossed with rap in Spanish — the heartbeat of modern Latin pop.',
      tracks: [ { title: 'Gasolina', artist: 'Daddy Yankee' }, { title: 'Danza Kuduro', artist: 'Don Omar' }, { title: 'Rakata', artist: 'Wisin & Yandel' } ] },

    { id: 'kwaito', label: 'Kwaito', cluster: 'global', era: 1994, scene: 'Johannesburg, South Africa',
      influencedBy: ['house'],
      blurb: 'Post-apartheid South African house — slowed down, deepened and toasted over in township slang.',
      tracks: [ { title: 'Nkalakatha', artist: 'Mandoza' }, { title: 'It\'s About Time', artist: 'Boom Shaka' }, { title: 'Shibobo', artist: 'TKZee' } ] },

    { id: 'afrobeats', label: 'Afrobeats', cluster: 'global', era: 2010, scene: 'Lagos & Accra',
      influencedBy: ['afrobeat', 'dancehall', 'boombap'],
      blurb: 'West Africa’s slick modern pop — afrobeat’s descendant blended with dancehall, R&B and hip-hop for the global charts.',
      tracks: [ { title: 'Essence', artist: 'Wizkid' }, { title: 'Ye', artist: 'Burna Boy' }, { title: 'Fall', artist: 'Davido' } ] },

    { id: 'amapiano', label: 'Amapiano', cluster: 'global', era: 2016, scene: 'South Africa',
      influencedBy: ['kwaito', 'house'],
      blurb: 'A South African house mutation built on jazzy keys, deep log-drum basslines and airy space — the global dance sound of the 2020s.',
      tracks: [ { title: 'Ke Star', artist: 'Focalistic' }, { title: 'Mnike', artist: 'Tyler ICU' }, { title: 'Asibe Happy', artist: 'Kabza De Small' } ] },
  ];

  // Index + reverse edges (computed forward influence)
  const BY_ID = {};
  NODES.forEach((n) => { n.influenced = []; BY_ID[n.id] = n; });
  NODES.forEach((n) => {
    n.influencedBy.forEach((pid) => {
      if (BY_ID[pid]) BY_ID[pid].influenced.push(n.id);
    });
  });

  // Layout order: era-sorted (used to pack the map lanes left-to-right).
  const ORDER = NODES.slice().sort((a, b) => a.era - b.era);

  // Play order: work through one super-genre at a time, oldest chapters first.
  // (Clusters ordered by the era of their earliest sub-genre.)
  const ROUND_ORDER = ['bluenote', 'rock', 'jamaica', 'edm', 'hiphop', 'global'];
  const CHAPTER_INFO = {
    bluenote: 'The roots. Blues, jazz and the Black American sound that everything else grew out of.',
    rock:     'Amplified rebellion — rock ’n’ roll splitting into punk, metal and every shade of alternative.',
    jamaica:  'Island science — ska and reggae, and the studio magic of dub.',
    edm:      'Machine music — disco’s pulse reborn as house, techno and the UK rave continuum.',
    hiphop:   'The break — turntables, sampling and rap, from the Bronx to global pop.',
    global:   'Crossing oceans — cross-pollinated sounds from Lagos to Rio to Johannesburg.',
  };
  const SEQUENCE = [];
  ROUND_ORDER.forEach((cid) => {
    NODES.filter((n) => n.cluster === cid).sort((a, b) => a.era - b.era)
      .forEach((n) => SEQUENCE.push(n));
  });

  function isFirstOfChapter(i) { return i === 0 || SEQUENCE[i].cluster !== SEQUENCE[i - 1].cluster; }
  function chapterNumber(cid) { return ROUND_ORDER.indexOf(cid) + 1; }

  const TOTAL = NODES.length;
  const INTRO_MS = 12000;          // play time (doubled from the first cut)
  const MAX_REROLLS = 6;
  const FETCH_TIMEOUT = 7000;

  // ====================================================================
  //  DOM
  // ====================================================================
  const legendEl = document.getElementById('legend');
  const mapWrap = document.getElementById('mapWrap');
  const svg = document.getElementById('map');
  const player = document.getElementById('player');

  const views = {
    start: document.getElementById('hudStart'),
    chapter: document.getElementById('hudChapter'),
    loading: document.getElementById('hudLoading'),
    error: document.getElementById('hudError'),
    round: document.getElementById('hudRound'),
    reveal: document.getElementById('hudReveal'),
    end: document.getElementById('hudEnd'),
  };
  const chapterKicker = document.getElementById('chapterKicker');
  const chapterTitle = document.getElementById('chapterTitle');
  const chapterText = document.getElementById('chapterText');
  const chapterBeginBtn = document.getElementById('chapterBeginBtn');
  const anotherBtn = document.getElementById('anotherBtn');
  const startBtn = document.getElementById('startBtn');
  const retryBtn = document.getElementById('retryBtn');
  const replayBtn = document.getElementById('replayBtn');
  const nextBtn = document.getElementById('nextBtn');
  const replayJourneyBtn = document.getElementById('replayJourneyBtn');
  const optionsEl = document.getElementById('options');
  const eqEl = document.getElementById('eq');
  const playStateEl = document.getElementById('playState');
  const errorText = document.getElementById('errorText');

  const revealDot = document.getElementById('revealDot');
  const revealName = document.getElementById('revealName');
  const revealEra = document.getElementById('revealEra');
  const revealTrack = document.getElementById('revealTrack');
  const revealBlurb = document.getElementById('revealBlurb');
  const revealLinks = document.getElementById('revealLinks');

  const discoveredEl = document.getElementById('discovered');
  const totalEl = document.getElementById('total');
  const footerStreak = document.getElementById('footerStreak');
  const bestEl = document.getElementById('bestScore');

  // ====================================================================
  //  State
  // ====================================================================
  let best = parseInt(localStorage.getItem('gg_best') || '0', 10);
  let streak = 0;
  let progress = parseInt(localStorage.getItem('gg_progress') || '0', 10); // # nodes done
  if (progress > TOTAL) progress = TOTAL;
  const lit = new Set();          // ids revealed on the map
  let currentIndex = 0;
  let currentMeta = null;         // iTunes result for the current node
  let answered = false;
  let audioCtx = null;
  let introTimer = null;
  let infoMode = false;           // reveal card opened by tapping a map node
  let activeView = 'start';
  let roundPool = null;           // shuffled tracks for the current node
  let usedIdx = -1;               // index into roundPool of the last-resolved track

  totalEl.textContent = TOTAL;
  bestEl.textContent = best;

  // ====================================================================
  //  Map layout + rendering (inline SVG, horizontally scrollable timeline)
  // ====================================================================
  const SVGNS = 'http://www.w3.org/2000/svg';
  const YEAR0 = 1900, YEAR1 = 2024;
  const PX_PER_YEAR = 26;
  const MARGIN_L = 96, MARGIN_R = 96, TOP_PAD = 18;
  const ROW_HEADER = 28, ROW_OFF = 58, LANE_PAD = 22, NODE_W = 128, NODE_H = 38, MIN_GAP = 168;

  let MAP_W = MARGIN_L + (YEAR1 - YEAR0) * PX_PER_YEAR + MARGIN_R;
  let MAP_H = 0;
  const laneTop = {};   // cluster id -> y of lane top

  let arrowLayer, nodeLayer;
  const nodeEls = {};   // id -> { g, ... }

  function xForEra(era) { return MARGIN_L + (era - YEAR0) * PX_PER_YEAR; }

  function layoutNodes() {
    // Stack clusters as vertical lanes sized to their row count; within a lane
    // pack nodes left-to-right by era using first-fit rows to avoid overlap.
    let top = TOP_PAD;
    CLUSTERS.forEach((c) => {
      laneTop[c.id] = top;
      const ns = ORDER.filter((n) => n.cluster === c.id); // already era-sorted
      const rows = []; // lastX per row
      ns.forEach((n) => {
        const x = xForEra(n.era);
        let r = rows.findIndex((lx) => x - lx >= MIN_GAP);
        if (r < 0) { r = rows.length; rows.push(x); } else { rows[r] = x; }
        n._x = x; n._row = r;
      });
      const rowCount = Math.max(1, rows.length);
      ns.forEach((n) => { n._y = top + ROW_HEADER + n._row * ROW_OFF; });
      top += ROW_HEADER + rowCount * ROW_OFF + LANE_PAD;
    });
    MAP_H = top + 6;
  }

  function el(tag, attrs) {
    const e = document.createElementNS(SVGNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function buildMap() {
    layoutNodes();
    svg.setAttribute('width', MAP_W);
    svg.setAttribute('height', MAP_H);
    svg.setAttribute('viewBox', '0 0 ' + MAP_W + ' ' + MAP_H);
    svg.innerHTML = '';

    // defs: arrowhead
    const defs = el('defs', {});
    const marker = el('marker', { id: 'ah', viewBox: '0 0 10 10', refX: '8', refY: '5',
      markerWidth: '6', markerHeight: '6', orient: 'auto-start-reverse' });
    marker.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'rgba(255,255,255,0.55)' }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    // decade gridlines + labels
    const grid = el('g', {});
    for (let y = 1900; y <= 2020; y += 10) {
      const gx = xForEra(y);
      grid.appendChild(el('line', { x1: gx, y1: TOP_PAD - 8, x2: gx, y2: MAP_H - 10,
        stroke: 'rgba(255,255,255,0.05)', 'stroke-width': '1' }));
      const t = el('text', { x: gx + 3, y: MAP_H - 6, class: 'decade-label' });
      t.textContent = "’" + String(y).slice(2) + 's';
      grid.appendChild(t);
    }
    svg.appendChild(grid);

    // lane labels
    const lanes = el('g', {});
    CLUSTERS.forEach((c) => {
      const t = el('text', { x: 8, y: laneTop[c.id] + 15, class: 'lane-label', fill: c.color });
      t.textContent = c.label;
      lanes.appendChild(t);
    });
    svg.appendChild(lanes);

    arrowLayer = el('g', {});
    svg.appendChild(arrowLayer);
    nodeLayer = el('g', {});
    svg.appendChild(nodeLayer);

    NODES.forEach((n) => createNodeEl(n));
  }

  function createNodeEl(n) {
    const g = el('g', { class: 'map-node locked', transform: 'translate(' + n._x + ',' + n._y + ')' });
    const color = CLUSTER_COLOR[n.cluster];

    // pulsing ring (current node)
    const ring = el('circle', { class: 'ring', cx: 0, cy: 0, r: 22,
      fill: 'none', stroke: color, 'stroke-width': '3', opacity: '0' });
    g.appendChild(ring);

    // locked / current marker
    const dot = el('circle', { class: 'dot', cx: 0, cy: 0, r: 10,
      fill: hexA(color, 0.18), stroke: color, 'stroke-width': '2' });
    g.appendChild(dot);
    const q = el('text', { class: 'qmark', x: 0, y: 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '13', 'font-weight': '800', fill: color, opacity: '0' });
    q.textContent = '?';
    g.appendChild(q);

    // bold solid pill (shown when lit)
    const pillG = el('g', { class: 'label pop' });
    const w = Math.max(NODE_W, n.label.length * 8.6 + 30);
    const rect = el('rect', { class: 'pill', x: -w / 2, y: -NODE_H / 2, width: w, height: NODE_H,
      rx: NODE_H / 2, fill: color });
    pillG.appendChild(rect);
    const label = el('text', { x: 0, y: 1, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '13.5', 'font-weight': '700', fill: '#0a0a12' });
    label.textContent = n.label;
    pillG.appendChild(label);
    pillG.setAttribute('opacity', '0');
    g.appendChild(pillG);

    g.addEventListener('click', () => { if (lit.has(n.id)) showReveal(n, true); });

    nodeLayer.appendChild(g);
    nodeEls[n.id] = { g, ring, dot, q, pillG };
  }

  function hexA(hex, a) {
    const m = hex.replace('#', '');
    const r = parseInt(m.slice(0, 2), 16), gg = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16);
    return 'rgba(' + r + ',' + gg + ',' + b + ',' + a + ')';
  }

  function setNodeState(id, state) {
    const ne = nodeEls[id];
    if (!ne) return;
    ne.g.setAttribute('class', 'map-node ' + state);
    const litState = state === 'lit';
    ne.pillG.setAttribute('opacity', litState ? '1' : '0');
    ne.dot.setAttribute('opacity', litState ? '0' : '1');
    ne.q.setAttribute('opacity', state === 'current' ? '1' : '0');
  }

  function redrawArrows() {
    if (!arrowLayer) return;
    arrowLayer.innerHTML = '';
    NODES.forEach((n) => {
      if (!lit.has(n.id)) return;
      n.influenced.forEach((cid) => {
        if (!lit.has(cid)) return;
        const a = BY_ID[n.id], b = BY_ID[cid];
        const x1 = a._x + 10, y1 = a._y, x2 = b._x - 10, y2 = b._y;
        const mx = (x1 + x2) / 2;
        const d = 'M' + x1 + ',' + y1 + ' C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2;
        arrowLayer.appendChild(el('path', { class: 'arrow', d: d,
          stroke: CLUSTER_COLOR[a.cluster], 'marker-end': 'url(#ah)' }));
      });
    });
  }

  function centerOn(node) {
    const left = Math.max(0, node._x - mapWrap.clientWidth / 2);
    const top = Math.max(0, node._y - mapWrap.clientHeight / 2);
    try { mapWrap.scrollTo({ left: left, top: top, behavior: 'smooth' }); }
    catch (_) { mapWrap.scrollLeft = left; mapWrap.scrollTop = top; }
  }

  // ====================================================================
  //  iTunes preview lookup (JSONP — sidesteps the endpoint's CORS)
  // ====================================================================
  function jsonpSearch(term) {
    return new Promise((resolve, reject) => {
      const cb = 'itunescb_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      let settled = false;
      const cleanup = () => { delete window[cb]; script.remove(); clearTimeout(timer); };
      const timer = setTimeout(() => { if (settled) return; settled = true; cleanup(); reject(new Error('timeout')); }, FETCH_TIMEOUT);
      window[cb] = (data) => { if (settled) return; settled = true; cleanup(); resolve(data); };
      script.onerror = () => { if (settled) return; settled = true; cleanup(); reject(new Error('network')); };
      script.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) +
        '&entity=song&limit=5&callback=' + cb;
      document.body.appendChild(script);
    });
  }

  // ====================================================================
  //  Sound effects (ported from the Perfect Circle game)
  // ====================================================================
  function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playBuzz() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.32);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.42);
    } catch (_) {}
  }
  function playChime() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      [880, 1320, 1760].forEach((freq, i) => {
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.frequency.value = freq; osc.type = 'sine';
        const start = now + i * 0.06;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.22, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(start); osc.stop(start + 0.55);
      });
    } catch (_) {}
  }

  // ====================================================================
  //  Preview playback
  // ====================================================================
  function stopIntro() {
    clearTimeout(introTimer); introTimer = null;
    try { player.pause(); } catch (_) {}
    eqEl.classList.add('paused');
  }
  function playIntro() {
    clearTimeout(introTimer);
    try { player.currentTime = 0; const p = player.play(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
    eqEl.classList.remove('paused');
    if (!answered) playStateEl.textContent = 'Playing intro…';
    introTimer = setTimeout(() => {
      stopIntro();
      if (!answered) playStateEl.textContent = 'Name the sub-genre';
    }, INTRO_MS);
  }

  // ====================================================================
  //  View switching
  // ====================================================================
  function show(view) {
    Object.keys(views).forEach((k) => { views[k].hidden = k !== view; });
    activeView = view;
  }

  // ====================================================================
  //  Round flow
  // ====================================================================
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // Resolve the first track in `pool` from index `fromIdx` that has a preview.
  async function resolvePreview(pool, fromIdx) {
    for (let i = fromIdx; i < pool.length && i < fromIdx + MAX_REROLLS; i++) {
      try {
        const data = await jsonpSearch(pool[i].artist + ' ' + pool[i].title);
        const hit = (data.results || []).find((r) => r.previewUrl);
        if (hit) return { meta: hit, idx: i };
      } catch (e) { /* try next track */ }
    }
    return null;
  }

  async function loadRound() {
    if (currentIndex >= TOTAL) { showEnd(); return; }
    answered = false;
    show('loading');
    const node = SEQUENCE[currentIndex];

    // highlight current node on the map
    NODES.forEach((n) => { if (!lit.has(n.id)) setNodeState(n.id, 'locked'); });
    setNodeState(node.id, 'current');
    centerOn(node);

    roundPool = shuffle(node.tracks);
    const first = await resolvePreview(roundPool, 0);
    if (!first) {
      errorText.textContent = 'Couldn’t load a track for ' + node.label + '. Check your connection.';
      show('error');
      return;
    }

    usedIdx = first.idx;
    currentMeta = first.meta;
    player.src = first.meta.previewUrl;

    anotherBtn.disabled = false;
    anotherBtn.hidden = roundPool.length < 2;
    anotherBtn.textContent = 'Hear another track';

    renderOptions(node);
    show('round');
    playStateEl.textContent = 'Playing intro…';
    playIntro();
  }

  async function playAnotherTrack() {
    if (!roundPool) return;
    anotherBtn.disabled = true;
    anotherBtn.textContent = 'Loading…';
    const next = await resolvePreview(roundPool, usedIdx + 1);
    if (next) {
      usedIdx = next.idx;
      currentMeta = next.meta;
      player.src = next.meta.previewUrl;
      playIntro();
    }
    const more = roundPool.length - 1 - usedIdx > 0;
    anotherBtn.disabled = !more;
    anotherBtn.textContent = more ? 'Hear another track' : 'No more tracks';
  }

  function renderOptions(node) {
    // distractors: prefer same cluster, then nearest era, to keep it niche/hard
    const others = NODES.filter((n) => n.id !== node.id);
    const sameCluster = shuffle(others.filter((n) => n.cluster === node.cluster));
    const rest = shuffle(others.filter((n) => n.cluster !== node.cluster))
      .sort((a, b) => Math.abs(a.era - node.era) - Math.abs(b.era - node.era));
    const distractors = sameCluster.concat(rest).slice(0, 3);
    const choices = shuffle([node].concat(distractors));

    optionsEl.innerHTML = '';
    choices.forEach((c) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = c.label;
      btn.addEventListener('click', () => handleGuess(c, node, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleGuess(choice, node, btn) {
    if (answered) return;
    answered = true;
    stopIntro();
    anotherBtn.disabled = true;

    const correct = choice.id === node.id;
    Array.from(optionsEl.querySelectorAll('.option')).forEach((b) => {
      b.disabled = true;
      if (b.textContent === node.label) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    if (correct) {
      streak += 1;
      if (streak > best) { best = streak; localStorage.setItem('gg_best', String(best)); bestEl.textContent = best; }
      playChime();
    } else {
      streak = 0;
      playBuzz();
    }
    footerStreak.textContent = streak;

    // Reveal the node on the map regardless (the story must continue)
    lit.add(node.id);
    setNodeState(node.id, 'lit');
    redrawArrows();
    discoveredEl.textContent = lit.size;
    centerOn(node);

    setTimeout(() => showReveal(node, false, correct), 650);
  }

  function showReveal(node, fromMap, correct) {
    infoMode = !!fromMap;
    revealDot.style.background = CLUSTER_COLOR[node.cluster];
    revealName.textContent = node.label;
    revealEra.textContent = node.era + ' · ' + node.scene;

    if (!fromMap && currentMeta) {
      revealTrack.innerHTML = 'You heard <b>' + escapeHtml(currentMeta.trackName || '') +
        '</b> — ' + escapeHtml(currentMeta.artistName || '');
      revealTrack.hidden = false;
    } else {
      revealTrack.hidden = true;
    }

    revealBlurb.textContent = node.blurb;

    revealLinks.innerHTML = '';
    const parents = node.influencedBy.map((id) => BY_ID[id] && BY_ID[id].label).filter(Boolean);
    const kids = node.influenced.map((id) => BY_ID[id] && BY_ID[id].label).filter(Boolean);
    if (parents.length) revealLinks.appendChild(lineageChip('Grew from', parents));
    if (kids.length) revealLinks.appendChild(lineageChip('Went on to shape', kids));

    nextBtn.textContent = fromMap ? 'Back' : ((currentIndex >= TOTAL - 1) ? 'Finish' : 'Next →');
    show('reveal');
  }

  function lineageChip(prefix, names) {
    const span = document.createElement('span');
    span.className = 'lineage';
    span.innerHTML = prefix + ' <b>' + names.map(escapeHtml).join(', ') + '</b>';
    return span;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  function advance() {
    currentIndex += 1;
    if (currentIndex > progress) { progress = currentIndex; localStorage.setItem('gg_progress', String(progress)); }
    enterCurrent();
  }

  // Move into the node at currentIndex — opening a chapter card at boundaries.
  function enterCurrent() {
    if (currentIndex >= TOTAL) { showEnd(); return; }
    if (isFirstOfChapter(currentIndex)) showChapterIntro(SEQUENCE[currentIndex].cluster);
    else loadRound();
  }

  function showChapterIntro(cid) {
    const cl = CLUSTERS.find((c) => c.id === cid);
    chapterKicker.textContent = 'Chapter ' + chapterNumber(cid) + ' of ' + ROUND_ORDER.length;
    chapterTitle.textContent = cl.label;
    chapterTitle.style.color = cl.color;
    chapterText.textContent = CHAPTER_INFO[cid] || '';
    show('chapter');
    const first = SEQUENCE[currentIndex];
    if (first) centerOn(first);
  }

  function showEnd() {
    const endText = document.getElementById('endText');
    endText.innerHTML = 'You traced <b>' + TOTAL + '</b> sub-genres across 120 years of music — ' +
      'from the Delta blues to UK drill. Best streak: <b>' + best + '</b>.';
    NODES.forEach((n) => { lit.add(n.id); setNodeState(n.id, 'lit'); });
    redrawArrows();
    discoveredEl.textContent = lit.size;
    show('end');
  }

  function resetJourney() {
    currentIndex = 0; progress = 0; streak = 0;
    localStorage.setItem('gg_progress', '0');
    lit.clear();
    NODES.forEach((n) => setNodeState(n.id, 'locked'));
    redrawArrows();
    discoveredEl.textContent = 0;
    footerStreak.textContent = 0;
  }

  // ====================================================================
  //  Init
  // ====================================================================
  function buildLegend() {
    CLUSTERS.forEach((c) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      const i = document.createElement('i');
      i.style.background = c.color;
      chip.appendChild(i);
      chip.appendChild(document.createTextNode(c.label));
      legendEl.appendChild(chip);
    });
  }

  function restoreProgress() {
    // Re-light everything completed in a previous session.
    for (let i = 0; i < Math.min(progress, TOTAL); i++) lit.add(SEQUENCE[i].id);
    lit.forEach((id) => setNodeState(id, 'lit'));
    redrawArrows();
    discoveredEl.textContent = lit.size;
    currentIndex = Math.min(progress, TOTAL);
  }

  startBtn.addEventListener('click', () => { ensureAudioCtx(); enterCurrent(); });
  chapterBeginBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  retryBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  anotherBtn.addEventListener('click', () => { ensureAudioCtx(); playAnotherTrack(); });
  nextBtn.addEventListener('click', () => {
    ensureAudioCtx();
    if (infoMode) {
      // Return from a tapped-node info card to wherever the journey actually is.
      infoMode = false;
      if (currentIndex >= TOTAL) show('end');
      else if (answered) showReveal(SEQUENCE[currentIndex], false);
      else show('round');
      return;
    }
    advance();
  });
  replayBtn.addEventListener('click', () => { ensureAudioCtx(); playIntro(); });
  replayJourneyBtn.addEventListener('click', () => { ensureAudioCtx(); resetJourney(); enterCurrent(); });

  player.addEventListener('playing', () => eqEl.classList.remove('paused'));
  player.addEventListener('pause', () => eqEl.classList.add('paused'));
  player.addEventListener('ended', () => eqEl.classList.add('paused'));
  window.addEventListener('resize', () => { /* SVG is fixed-size + scrollable; nothing to recompute */ });

  buildLegend();
  buildMap();
  restoreProgress();

  if (progress >= TOTAL) {
    showEnd();
  } else {
    if (progress > 0) {
      const startText = views.start.querySelector('.panel-text');
      if (startText) startText.textContent = 'You’ve discovered ' + progress + ' of ' + TOTAL + ' sub-genres. Pick up where you left off.';
      startBtn.textContent = 'Continue';
    }
    show('start');
  }
})();
