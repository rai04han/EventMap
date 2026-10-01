/**
 * venues.js – campus venue data
 *
 * Owner: C
 * Each venue: { id, name, building, floor, landmark, directions, mapX, mapY }
 * mapX/mapY are percentages (0-100) for pin placement on the SVG campus map.
 *
 * C: replace these placeholder venues with real Christ Nagar venues.
 */

export const venues = [
  {
    id: 'v1',
    name: 'Main Auditorium',
    building: 'Admin Block',
    floor: 'Ground Floor',
    landmark: 'Next to the reception desk',
    directions:
      'From the main gate, walk straight along the central pathway for 2 minutes. The Admin Block is the large building directly ahead. Enter through the main doors — the auditorium is on the ground floor to your left.',
    mapX: 50,
    mapY: 35,
  },
  {
    id: 'v2',
    name: 'Seminar Hall A',
    building: 'Academic Block 1',
    floor: '2nd Floor',
    landmark: 'Opposite the library entrance',
    directions:
      'From the main gate, take the left pathway past the canteen. Academic Block 1 is the 3-storey building on your right. Take the stairs to the 2nd floor; Seminar Hall A is the first room on your right.',
    mapX: 30,
    mapY: 50,
  },
  {
    id: 'v3',
    name: 'Open-Air Stage',
    building: 'Central Quadrangle',
    floor: 'Ground Level',
    landmark: 'Between the canteen and the library',
    directions:
      'From the main gate, walk straight for 1 minute and turn left at the signboard. The open-air stage is in the centre of the quadrangle — you\'ll hear the speakers!',
    mapX: 45,
    mapY: 55,
  },
  {
    id: 'v4',
    name: 'CS Lab 3',
    building: 'Tech Wing',
    floor: '3rd Floor',
    landmark: 'Near the elevator on the east side',
    directions:
      'From the main gate, turn right toward the Tech Wing (the building with the glass facade). Take the elevator or stairs to the 3rd floor. CS Lab 3 is at the end of the corridor on your left.',
    mapX: 72,
    mapY: 40,
  },
  {
    id: 'v5',
    name: 'Sports Ground',
    building: 'Outdoor Facilities',
    floor: 'Ground Level',
    landmark: 'Behind the hostel block',
    directions:
      'From the main gate, walk straight past the Admin Block and continue for 3 minutes. The sports ground is behind the hostel block — follow the painted path.',
    mapX: 60,
    mapY: 78,
  },
  {
    id: 'v6',
    name: 'Mini Hall',
    building: 'Student Centre',
    floor: '1st Floor',
    landmark: 'Above the co-op store',
    directions:
      'From the main gate, take the right pathway for 1 minute. The Student Centre is on your left (look for the "Co-op Store" sign). Go up the staircase — Mini Hall is on the 1st floor.',
    mapX: 35,
    mapY: 30,
  },
];
