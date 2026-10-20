export const agents = [
  {
    id: 'sophia-laurent',
    name: 'Sophia Laurent',
    role: 'Senior Partner · Los Angeles',
    image: 'photo-1494790108377-be9c29b29330',
    phone: '+1 (310) 555-0161',
    email: 'sophia@aureliaestates.com',
    bio: 'Fifteen years guiding buyers through LA’s most coveted hillside estates.',
    sold: 320,
  },
  {
    id: 'marcus-bennett',
    name: 'Marcus Bennett',
    role: 'Luxury Specialist · New York',
    image: 'photo-1507003211169-0a1dd7228f2c',
    phone: '+1 (212) 555-0174',
    email: 'marcus@aureliaestates.com',
    bio: 'Manhattan penthouses and prewar classics are his specialty.',
    sold: 245,
  },
  {
    id: 'elena-rossi',
    name: 'Elena Rossi',
    role: 'Coastal Properties · Miami',
    image: 'photo-1438761681033-6461ffad8d80',
    phone: '+1 (305) 555-0139',
    email: 'elena@aureliaestates.com',
    bio: 'Waterfront living expert with a network across South Florida.',
    sold: 280,
  },
  {
    id: 'james-whitaker',
    name: 'James Whitaker',
    role: 'Investment Advisor · Austin',
    image: 'photo-1500648767791-00dcc994a43e',
    phone: '+1 (512) 555-0198',
    email: 'james@aureliaestates.com',
    bio: 'Helps families and investors find value in fast-growing markets.',
    sold: 190,
  },
]

export const getAgentById = (id) => agents.find((a) => a.id === id) ?? agents[0]
