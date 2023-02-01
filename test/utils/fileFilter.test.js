const fileFilter = require('../../utils/fileFilter');

describe('fileFilter', () => {
    it('should return true for allowed file types', () => {
      const file = { mimetype: 'image/jpeg' };
      const cb = jest.fn();
  
      fileFilter(null, file, cb);
  
      expect(cb).toHaveBeenCalledWith(null, true);
    });
  
    it('should return false for disallowed file types', () => {
      const file = { mimetype: 'text/plain' };
      const cb = jest.fn();
  
      fileFilter(null, file, cb);
  
      expect(cb).toHaveBeenCalledWith(null, false);
    });
  });