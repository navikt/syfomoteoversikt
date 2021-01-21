const defaultState = {
  data: [],
  sender: false,
  sendt: false,
  sendingFeilet: false,
};

export default function overfor(state = defaultState, action) {
  switch (action.type) {
    case "MARKER_MOTE_FOR_OVERFORING": {
      if (!action.overta) {
        const data = state.data.filter((moteUuid) => {
          return moteUuid !== action.moteUuid;
        });
        return Object.assign({}, state, {
          data,
        });
      }
      return Object.assign({}, state, {
        data: [...state.data, action.moteUuid],
        sendt: false,
      });
    }
    case "OVERFOR_MOTER_FEILET": {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: true,
        sendt: false,
      });
    }
    case "OVERFORER_MOTER": {
      return Object.assign({}, state, {
        sender: true,
        sendingFeilet: false,
        sendt: false,
      });
    }
    case "MOTER_OVERFORT": {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: false,
        sendt: true,
      });
    }
    case "OVERFOR_MOTER_RESET": {
      return Object.assign({}, state, {
        sender: false,
        sendingFeilet: false,
        sendt: false,
        data: [],
      });
    }
    default: {
      return state;
    }
  }
}
