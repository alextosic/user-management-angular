class MfaDTO {
  constructor({ _id, type, verified, uri }) {
    this.id = _id;
    this.type = type;
    this.verified = verified;
    this.uri = uri;
  }

  toJson() {
    return {
      id: this.id,
      type: this.type,
      verified: this.verified,
      uri: this.uri,
    };
  }

  static fromArray(mfaArray) {
    return mfaArray.map((mfa) => new MfaDTO(mfa).toJson());
  }
}

module.exports = MfaDTO;
