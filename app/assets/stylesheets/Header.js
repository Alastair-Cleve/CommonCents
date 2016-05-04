module.exports = {
  overlay : {
    'position'        : 'fixed',
    'top'             : 0,
    'left'            : 0,
    'right'           : 0,
    'bottom'          : 0,
    'backgroundColor' : 'rgba(000, 000, 000, 0.75)',
    'zIndex'          : 10
  },
  content : {
    'position'        : 'fixed',
    'top'             : '75px',
    'left'            : '300px',
    'right'           : '300px',
    'bottom'          : '75px',
    'border'          : '1px solid #ccc',
    'padding'         : '20px',
    'zIndex'          : 11,
    'opacity'         : 0,
    'transition'      : 'opacity 1s'
  }
};
