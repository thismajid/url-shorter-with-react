export default class SendResponse {
    constructor(statusCode = null, type = null, data = null, message = null) {
      this.statusCode = statusCode;
      this.type = type;
      this.data = data;
      this.message = message;
    }
  
    setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'success';
      return this;
    }
  
    setError(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = 'error';
      data ? (this.data = data) : '';
      return this;
    }
  
    send(res) {
      const result = {
        status: this.type,
        message: this.message,
        data: this.data,
      };
  
      if (this.type === 'success' || this.data)
        return res.status(this.statusCode).json(result);
  
      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message,
      });
    }
  }