var avro = require('./index').DataFile.AvroFile();

var Schema = require('./index').Schema.Schema;

var address = {
    "type":"record",
    "name":"Address",
    "namespace":"com.inin.events.conversation",
    "fields":[
        {"name":"name","type":["null",{"type":"string","avro.java.string":"String"}],"default":null},
        {"name":"nameRaw","type":["null",{"type":"string","avro.java.string":"String"}],"default":null},
        {"name":"addressNormalized","type":["null",{"type":"string","avro.java.string":"String"}],"default":null},
        {"name":"addressDisplayable","type":["null",{"type":"string","avro.java.string":"String"}],"default":null},
        {"name":"addressRaw","type":["null",{"type":"string","avro.java.string":"String"}],"default":null}
    ]
};

var addressSchema = new Schema(address);

console.log(addressSchema instanceof Schema);

var sessionEvent = {
  "type":"record",
  "doc":"Topic: ProviderMultimediaSessionEvent. A value of this type is sent when a session event is generated by a Multimedia (WebRTC) conversation participant.",
  "name":"ProviderMultimediaSessionEvent",
  "namespace":"com.inin.events.provider",
  "imports":["RoutingData.avsc","ProviderEvent.avsc", "Address.avsc"],
  "fields": [
    {
      "name":"self",
      "doc":"Name/Address for the participant on this side of the email conversation.",
      "type":"com.inin.events.conversation.Address",
      "default":{}
    },
    {
      "name":"sessionId",
      "doc":"UUID identifying the session from the point of view of a participant in the conference.",
      "type":{"type":"string","avro.java.string":"String"}
    },
    {
      "name":"context",
      "doc":"The room id context (xmpp jid) for the conference session.",
      "type":{"type":"string","avro.java.string":"String"}
    },
    {
      "name":"state",
      "doc":"The current state of the participant in the conference. Valid values are in Constants.java",
      "type":{"type":"string","avro.java.string":"String"}
    },
    {
      "name":"audioMuted",
      "doc":"Indicates whether this participant has muted their outgoing audio.",
      "type":"boolean",
      "default":false
    },
    {
      "name":"videoMuted",
      "doc":"Indicates whether this participant has muted/paused their outgoing video.",
      "type":"boolean",
      "default":false
    },
    {
      "name":"sharingScreen",
      "doc":"Indicates whether this participant is sharing their screen to the session.",
      "type":"boolean",
      "default":false
    },
    {
      "name":"peerCount",
      "doc":"The number of peer participants from the perspective of the participant in the conference.",
      "type":"long"
    },
    {
      "name":"disconnectType",
      "doc":"Indicates what caused this participant to be terminated from the session. Valid values are in the DisconnectType enum.",
      "type":["null",{"type":"string","avro.java.string":"String"}],
      "default":null
    }
  ]
};

var sessionEventSchema = new Schema(sessionEvent, 'com.inin.events.provider', [addressSchema]);