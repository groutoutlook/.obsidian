var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// build/Main.js
__export(exports, {
  Plugin2: () => Plugin2,
  Plugin2_$ctor_Z7F5F6E8A: () => Plugin2_$ctor_Z7F5F6E8A,
  Plugin2_$reflection: () => Plugin2_$reflection,
  Plugin2__commandById_Z721C83C5: () => Plugin2__commandById_Z721C83C5,
  Plugin2__init: () => Plugin2__init,
  Plugin2__onload: () => Plugin2__onload
});

// build/fable_modules/fable-library-js.4.24.0/Util.js
function isArrayLike(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x);
}
function isEnumerable(x) {
  return x != null && typeof x.GetEnumerator === "function";
}
function isComparable(x) {
  return x != null && typeof x.CompareTo === "function";
}
function isEquatable(x) {
  return x != null && typeof x.Equals === "function";
}
function isHashable(x) {
  return x != null && typeof x.GetHashCode === "function";
}
function isDisposable(x) {
  return x != null && typeof x.Dispose === "function";
}
function disposeSafe(x) {
  if (isDisposable(x)) {
    x.Dispose();
  }
}
function defaultOf() {
  return null;
}
function sameConstructor(x, y) {
  return Object.getPrototypeOf(x)?.constructor === Object.getPrototypeOf(y)?.constructor;
}
var Enumerable = class {
  constructor(en) {
    this.en = en;
  }
  GetEnumerator() {
    return this.en;
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    return this.en;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const hasNext = this.en["System.Collections.IEnumerator.MoveNext"]();
    const current = hasNext ? this.en["System.Collections.Generic.IEnumerator`1.get_Current"]() : void 0;
    return { done: !hasNext, value: current };
  }
};
var Enumerator = class {
  constructor(iter) {
    this.iter = iter;
    this.current = defaultOf();
  }
  ["System.Collections.Generic.IEnumerator`1.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.MoveNext"]() {
    const cur = this.iter.next();
    this.current = cur.value;
    return !cur.done;
  }
  ["System.Collections.IEnumerator.Reset"]() {
    throw new Error("JS iterators cannot be reset");
  }
  Dispose() {
    return;
  }
};
function getEnumerator(e) {
  if (isEnumerable(e)) {
    return e.GetEnumerator();
  } else {
    return new Enumerator(e[Symbol.iterator]());
  }
}
function toIterator(en) {
  return {
    next() {
      const hasNext = en["System.Collections.IEnumerator.MoveNext"]();
      const current = hasNext ? en["System.Collections.Generic.IEnumerator`1.get_Current"]() : void 0;
      return { done: !hasNext, value: current };
    }
  };
}
function padWithZeros(i, length3) {
  return i.toString(10).padStart(length3, "0");
}
function dateOffset(date) {
  const date1 = date;
  return typeof date1.offset === "number" ? date1.offset : date.kind === 1 ? 0 : date.getTimezoneOffset() * -6e4;
}
var ObjectRef = class {
  static id(o) {
    if (!ObjectRef.idMap.has(o)) {
      ObjectRef.idMap.set(o, ++ObjectRef.count);
    }
    return ObjectRef.idMap.get(o);
  }
};
ObjectRef.idMap = new WeakMap();
ObjectRef.count = 0;
function stringHash(s) {
  let i = 0;
  let h = 5381;
  const len = s.length;
  while (i < len) {
    h = h * 33 ^ s.charCodeAt(i++);
  }
  return h;
}
function numberHash(x) {
  return x * 2654435761 | 0;
}
function bigintHash(x) {
  return stringHash(x.toString(32));
}
function combineHashCodes(hashes) {
  let h1 = 0;
  const len = hashes.length;
  for (let i = 0; i < len; i++) {
    const h2 = hashes[i];
    h1 = (h1 << 5) + h1 ^ h2;
  }
  return h1;
}
function dateHash(x) {
  return x.getTime();
}
function arrayHash(x) {
  const len = x.length;
  const hashes = new Array(len);
  for (let i = 0; i < len; i++) {
    hashes[i] = structuralHash(x[i]);
  }
  return combineHashCodes(hashes);
}
function structuralHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "bigint":
      return bigintHash(x);
    case "string":
      return stringHash(x);
    default: {
      if (isHashable(x)) {
        return x.GetHashCode();
      } else if (isArrayLike(x)) {
        return arrayHash(x);
      } else if (x instanceof Date) {
        return dateHash(x);
      } else if (Object.getPrototypeOf(x)?.constructor === Object) {
        const hashes = Object.values(x).map((v) => structuralHash(v));
        return combineHashCodes(hashes);
      } else {
        return numberHash(ObjectRef.id(x));
      }
    }
  }
}
function equalArraysWith(x, y, eq) {
  if (x == null) {
    return y == null;
  }
  if (y == null) {
    return false;
  }
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (!eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
}
function equalArrays(x, y) {
  return equalArraysWith(x, y, equals);
}
function equalObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return false;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0; i < xKeys.length; i++) {
    if (xKeys[i] !== yKeys[i] || !equals(x[xKeys[i]], y[yKeys[i]])) {
      return false;
    }
  }
  return true;
}
function equals(x, y) {
  if (x === y) {
    return true;
  } else if (x == null) {
    return y == null;
  } else if (y == null) {
    return false;
  } else if (isEquatable(x)) {
    return x.Equals(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) && equalArrays(x, y);
  } else if (typeof x !== "object") {
    return false;
  } else if (x instanceof Date) {
    return y instanceof Date && compareDates(x, y) === 0;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object && equalObjects(x, y);
  }
}
function compareDates(x, y) {
  let xtime;
  let ytime;
  if ("offset" in x && "offset" in y) {
    xtime = x.getTime();
    ytime = y.getTime();
  } else {
    xtime = x.getTime() + dateOffset(x);
    ytime = y.getTime() + dateOffset(y);
  }
  return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
function comparePrimitives(x, y) {
  return x === y ? 0 : x < y ? -1 : 1;
}
function compareArraysWith(x, y, comp) {
  if (x == null) {
    return y == null ? 0 : 1;
  }
  if (y == null) {
    return -1;
  }
  if (x.length !== y.length) {
    return x.length < y.length ? -1 : 1;
  }
  for (let i = 0, j = 0; i < x.length; i++) {
    j = comp(x[i], y[i]);
    if (j !== 0) {
      return j;
    }
  }
  return 0;
}
function compareArrays(x, y) {
  return compareArraysWith(x, y, compare);
}
function compareObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return xKeys.length < yKeys.length ? -1 : 1;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0, j = 0; i < xKeys.length; i++) {
    const key = xKeys[i];
    if (key !== yKeys[i]) {
      return key < yKeys[i] ? -1 : 1;
    } else {
      j = compare(x[key], y[key]);
      if (j !== 0) {
        return j;
      }
    }
  }
  return 0;
}
function compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x == null) {
    return y == null ? 0 : -1;
  } else if (y == null) {
    return 1;
  } else if (isComparable(x)) {
    return x.CompareTo(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) ? compareArrays(x, y) : -1;
  } else if (typeof x !== "object") {
    return x < y ? -1 : 1;
  } else if (x instanceof Date) {
    return y instanceof Date ? compareDates(x, y) : -1;
  } else {
    return Object.getPrototypeOf(x)?.constructor === Object ? compareObjects(x, y) : -1;
  }
}
var curried = new WeakMap();
function uncurry2(f) {
  if (f == null) {
    return null;
  }
  const f2 = (a1, a2) => f(a1)(a2);
  curried.set(f2, f);
  return f2;
}

// build/fable_modules/fable-library-js.4.24.0/Types.js
function seqToString(self) {
  let count = 0;
  let str = "[";
  for (const x of self) {
    if (count === 0) {
      str += toString(x);
    } else if (count === 100) {
      str += "; ...";
      break;
    } else {
      str += "; " + toString(x);
    }
    count++;
  }
  return str + "]";
}
function toString(x, callStack = 0) {
  if (x != null && typeof x === "object") {
    if (typeof x.toString === "function") {
      return x.toString();
    } else if (Symbol.iterator in x) {
      return seqToString(x);
    } else {
      const cons2 = Object.getPrototypeOf(x)?.constructor;
      return cons2 === Object && callStack < 10 ? "{ " + Object.entries(x).map(([k, v]) => k + " = " + toString(v, callStack + 1)).join("\n  ") + " }" : cons2?.name ?? "";
    }
  }
  return String(x);
}
function unionToString(name2, fields) {
  if (fields.length === 0) {
    return name2;
  } else {
    let fieldStr;
    let withParens = true;
    if (fields.length === 1) {
      fieldStr = toString(fields[0]);
      withParens = fieldStr.indexOf(" ") >= 0;
    } else {
      fieldStr = fields.map((x) => toString(x)).join(", ");
    }
    return name2 + (withParens ? " (" : " ") + fieldStr + (withParens ? ")" : "");
  }
}
var Union = class {
  get name() {
    return this.cases()[this.tag];
  }
  toJSON() {
    return this.fields.length === 0 ? this.name : [this.name].concat(this.fields);
  }
  toString() {
    return unionToString(this.name, this.fields);
  }
  GetHashCode() {
    const hashes = this.fields.map((x) => structuralHash(x));
    hashes.splice(0, 0, numberHash(this.tag));
    return combineHashCodes(hashes);
  }
  Equals(other) {
    if (this === other) {
      return true;
    } else if (!sameConstructor(this, other)) {
      return false;
    } else if (this.tag === other.tag) {
      return equalArrays(this.fields, other.fields);
    } else {
      return false;
    }
  }
  CompareTo(other) {
    if (this === other) {
      return 0;
    } else if (!sameConstructor(this, other)) {
      return -1;
    } else if (this.tag === other.tag) {
      return compareArrays(this.fields, other.fields);
    } else {
      return this.tag < other.tag ? -1 : 1;
    }
  }
};
function recordToJSON(self) {
  const o = {};
  const keys = Object.keys(self);
  for (let i = 0; i < keys.length; i++) {
    o[keys[i]] = self[keys[i]];
  }
  return o;
}
function recordToString(self) {
  return "{ " + Object.entries(self).map(([k, v]) => k + " = " + toString(v)).join("\n  ") + " }";
}
function recordGetHashCode(self) {
  const hashes = Object.values(self).map((v) => structuralHash(v));
  return combineHashCodes(hashes);
}
function recordEquals(self, other) {
  if (self === other) {
    return true;
  } else if (!sameConstructor(self, other)) {
    return false;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      if (!equals(self[thisNames[i]], other[thisNames[i]])) {
        return false;
      }
    }
    return true;
  }
}
function recordCompareTo(self, other) {
  if (self === other) {
    return 0;
  } else if (!sameConstructor(self, other)) {
    return -1;
  } else {
    const thisNames = Object.keys(self);
    for (let i = 0; i < thisNames.length; i++) {
      const result = compare(self[thisNames[i]], other[thisNames[i]]);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }
}
var Record = class {
  toJSON() {
    return recordToJSON(this);
  }
  toString() {
    return recordToString(this);
  }
  GetHashCode() {
    return recordGetHashCode(this);
  }
  Equals(other) {
    return recordEquals(this, other);
  }
  CompareTo(other) {
    return recordCompareTo(this, other);
  }
};
var FSharpRef = class {
  get contents() {
    return this.getter();
  }
  set contents(v) {
    this.setter(v);
  }
  constructor(contentsOrGetter, setter) {
    if (typeof setter === "function") {
      this.getter = contentsOrGetter;
      this.setter = setter;
    } else {
      this.getter = () => contentsOrGetter;
      this.setter = (v) => {
        contentsOrGetter = v;
      };
    }
  }
};

// build/Main.js
var import_obsidian = __toModule(require("obsidian"));

// build/fable_modules/fable-library-js.4.24.0/Numeric.js
var symbol = Symbol("numeric");
function isNumeric(x) {
  return typeof x === "number" || typeof x === "bigint" || x?.[symbol];
}
function compare2(x, y) {
  if (typeof x === "number") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else if (typeof x === "bigint") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else {
    return x.CompareTo(y);
  }
}
function multiply(x, y) {
  if (typeof x === "number") {
    return x * y;
  } else if (typeof x === "bigint") {
    return x * BigInt(y);
  } else {
    return x[symbol]().multiply(y);
  }
}
function toFixed(x, dp) {
  if (typeof x === "number") {
    return x.toFixed(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toFixed(dp);
  }
}
function toPrecision(x, sd) {
  if (typeof x === "number") {
    return x.toPrecision(sd);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toPrecision(sd);
  }
}
function toExponential(x, dp) {
  if (typeof x === "number") {
    return x.toExponential(dp);
  } else if (typeof x === "bigint") {
    return x;
  } else {
    return x[symbol]().toExponential(dp);
  }
}
function toHex(x) {
  if (typeof x === "number") {
    return (Number(x) >>> 0).toString(16);
  } else if (typeof x === "bigint") {
    return BigInt.asUintN(64, x).toString(16);
  } else {
    return x[symbol]().toHex();
  }
}

// build/fable_modules/fable-library-js.4.24.0/Reflection.js
var TypeInfo = class {
  constructor(fullname, generics, construct, parent, fields, cases, enumCases) {
    this.fullname = fullname;
    this.generics = generics;
    this.construct = construct;
    this.parent = parent;
    this.fields = fields;
    this.cases = cases;
    this.enumCases = enumCases;
  }
  toString() {
    return fullName(this);
  }
  GetHashCode() {
    return getHashCode(this);
  }
  Equals(other) {
    return equals2(this, other);
  }
};
function getGenerics(t) {
  return t.generics != null ? t.generics : [];
}
function getHashCode(t) {
  const fullnameHash = stringHash(t.fullname);
  const genHashes = getGenerics(t).map(getHashCode);
  return combineHashCodes([fullnameHash, ...genHashes]);
}
function equals2(t1, t2) {
  if (t1.fullname === "") {
    return t2.fullname === "" && equalArraysWith(getRecordElements(t1), getRecordElements(t2), ([k1, v1], [k2, v2]) => k1 === k2 && equals2(v1, v2));
  } else {
    return t1.fullname === t2.fullname && equalArraysWith(getGenerics(t1), getGenerics(t2), equals2);
  }
}
function class_type(fullname, generics, construct, parent) {
  return new TypeInfo(fullname, generics, construct, parent);
}
function record_type(fullname, generics, construct, fields) {
  return new TypeInfo(fullname, generics, construct, void 0, fields);
}
var obj_type = new TypeInfo("System.Object");
var unit_type = new TypeInfo("Microsoft.FSharp.Core.Unit");
var char_type = new TypeInfo("System.Char");
var string_type = new TypeInfo("System.String");
var bool_type = new TypeInfo("System.Boolean");
var int8_type = new TypeInfo("System.SByte");
var uint8_type = new TypeInfo("System.Byte");
var int16_type = new TypeInfo("System.Int16");
var uint16_type = new TypeInfo("System.UInt16");
var int32_type = new TypeInfo("System.Int32");
var uint32_type = new TypeInfo("System.UInt32");
var int64_type = new TypeInfo("System.Int64");
var uint64_type = new TypeInfo("System.UInt64");
var int128_type = new TypeInfo("System.Int128");
var uint128_type = new TypeInfo("System.UInt128");
var nativeint_type = new TypeInfo("System.IntPtr");
var unativeint_type = new TypeInfo("System.UIntPtr");
var float16_type = new TypeInfo("System.Half");
var float32_type = new TypeInfo("System.Single");
var float64_type = new TypeInfo("System.Double");
var decimal_type = new TypeInfo("System.Decimal");
var bigint_type = new TypeInfo("System.Numerics.BigInteger");
function name(info) {
  if (Array.isArray(info)) {
    return info[0];
  } else if (info instanceof TypeInfo) {
    const elemType = getElementType(info);
    if (elemType != null) {
      return name(elemType) + "[]";
    } else {
      const i = info.fullname.lastIndexOf(".");
      return i === -1 ? info.fullname : info.fullname.substr(i + 1);
    }
  } else {
    return info.name;
  }
}
function fullName(t) {
  const elemType = getElementType(t);
  if (elemType != null) {
    return fullName(elemType) + "[]";
  } else if (t.generics == null || t.generics.length === 0) {
    return t.fullname;
  } else {
    return t.fullname + "[" + t.generics.map((x) => fullName(x)).join(",") + "]";
  }
}
function getElementType(t) {
  return t.fullname === "[]" && t.generics?.length === 1 ? t.generics[0] : void 0;
}
function getRecordElements(t) {
  if (t.fields != null) {
    return t.fields();
  } else {
    throw new Error(`${t.fullname} is not an F# record type`);
  }
}
function getValue(propertyInfo, v) {
  return v[propertyInfo[0]];
}

// build/fable_modules/fable-library-js.4.24.0/Date.js
var shortDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
var longDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var longMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function parseRepeatToken(format2, pos, patternChar) {
  let tokenLength = 0;
  let internalPos = pos;
  while (internalPos < format2.length && format2[internalPos] === patternChar) {
    internalPos++;
    tokenLength++;
  }
  return tokenLength;
}
function parseNextChar(format2, pos) {
  if (pos >= format2.length - 1) {
    return -1;
  }
  return format2.charCodeAt(pos + 1);
}
function parseQuotedString(format2, pos) {
  let beginPos = pos;
  const quoteChar = format2[pos];
  let result = "";
  let foundQuote = false;
  while (pos < format2.length) {
    pos++;
    const currentChar = format2[pos];
    if (currentChar === quoteChar) {
      foundQuote = true;
      break;
    } else if (currentChar === "\\") {
      if (pos < format2.length) {
        pos++;
        result += format2[pos];
      } else {
        throw new Error("Invalid string format");
      }
    } else {
      result += currentChar;
    }
  }
  if (!foundQuote) {
    throw new Error(`Invalid string format could not find matching quote for ${quoteChar}`);
  }
  return [result, pos - beginPos + 1];
}
function dateToStringWithCustomFormat(date, format2, utc) {
  let cursorPos = 0;
  let tokenLength = 0;
  let result = "";
  const localizedDate = utc ? DateTime(date.getTime(), 1) : date;
  while (cursorPos < format2.length) {
    const token = format2[cursorPos];
    switch (token) {
      case "d":
        tokenLength = parseRepeatToken(format2, cursorPos, "d");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += day(localizedDate);
            break;
          case 2:
            result += padWithZeros(day(localizedDate), 2);
            break;
          case 3:
            result += shortDays[dayOfWeek(localizedDate)];
            break;
          case 4:
            result += longDays[dayOfWeek(localizedDate)];
            break;
          default:
            break;
        }
        break;
      case "f":
        tokenLength = parseRepeatToken(format2, cursorPos, "f");
        cursorPos += tokenLength;
        if (tokenLength <= 3) {
          const precision = 10 ** (3 - tokenLength);
          result += padWithZeros(Math.floor(millisecond(localizedDate) / precision), tokenLength);
        } else if (tokenLength <= 7) {
          result += ("" + millisecond(localizedDate)).padEnd(tokenLength, "0");
        }
        break;
      case "F":
        tokenLength = parseRepeatToken(format2, cursorPos, "F");
        cursorPos += tokenLength;
        if (tokenLength <= 3) {
          const precision = 10 ** (3 - tokenLength);
          const value2 = Math.floor(millisecond(localizedDate) / precision);
          if (value2 != 0) {
            result += padWithZeros(value2, tokenLength);
          }
        } else if (tokenLength <= 7) {
          const value2 = millisecond(localizedDate);
          if (value2 != 0) {
            result += padWithZeros(value2, 3);
          }
        }
        break;
      case "g":
        tokenLength = parseRepeatToken(format2, cursorPos, "g");
        cursorPos += tokenLength;
        if (tokenLength <= 2) {
          result += "A.D.";
        }
        break;
      case "h":
        tokenLength = parseRepeatToken(format2, cursorPos, "h");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += hour(localizedDate) % 12;
            break;
          case 2:
            result += padWithZeros(hour(localizedDate) % 12, 2);
            break;
          default:
            break;
        }
        break;
      case "H":
        tokenLength = parseRepeatToken(format2, cursorPos, "H");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += hour(localizedDate);
            break;
          case 2:
            result += padWithZeros(hour(localizedDate), 2);
            break;
          default:
            break;
        }
        break;
      case "K":
        tokenLength = parseRepeatToken(format2, cursorPos, "K");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            switch (kind(localizedDate)) {
              case 1:
                result += "Z";
                break;
              case 2:
                result += dateOffsetToString(localizedDate.getTimezoneOffset() * -6e4);
                break;
              case 0:
                break;
            }
            break;
          default:
            break;
        }
        break;
      case "m":
        tokenLength = parseRepeatToken(format2, cursorPos, "m");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += minute(localizedDate);
            break;
          case 2:
            result += padWithZeros(minute(localizedDate), 2);
            break;
          default:
            break;
        }
        break;
      case "M":
        tokenLength = parseRepeatToken(format2, cursorPos, "M");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += month(localizedDate);
            break;
          case 2:
            result += padWithZeros(month(localizedDate), 2);
            break;
          case 3:
            result += shortMonths[month(localizedDate) - 1];
            break;
          case 4:
            result += longMonths[month(localizedDate) - 1];
            break;
          default:
            break;
        }
        break;
      case "s":
        tokenLength = parseRepeatToken(format2, cursorPos, "s");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += second(localizedDate);
            break;
          case 2:
            result += padWithZeros(second(localizedDate), 2);
            break;
          default:
            break;
        }
        break;
      case "t":
        tokenLength = parseRepeatToken(format2, cursorPos, "t");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += localizedDate.getHours() < 12 ? "A" : "P";
            break;
          case 2:
            result += localizedDate.getHours() < 12 ? "AM" : "PM";
            break;
          default:
            break;
        }
        break;
      case "y":
        tokenLength = parseRepeatToken(format2, cursorPos, "y");
        cursorPos += tokenLength;
        switch (tokenLength) {
          case 1:
            result += localizedDate.getFullYear() % 100;
            break;
          case 2:
            result += padWithZeros(localizedDate.getFullYear() % 100, 2);
            break;
          case 3:
            result += padWithZeros(localizedDate.getFullYear(), 3);
            break;
          case 4:
            result += padWithZeros(localizedDate.getFullYear(), 4);
            break;
          case 5:
            result += padWithZeros(localizedDate.getFullYear(), 5);
            break;
          default:
            break;
        }
        break;
      case "z":
        tokenLength = parseRepeatToken(format2, cursorPos, "z");
        cursorPos += tokenLength;
        let utcOffsetText = "";
        switch (kind(localizedDate)) {
          case 1:
            utcOffsetText = "+00:00";
            break;
          case 2:
            utcOffsetText = dateOffsetToString(localizedDate.getTimezoneOffset() * -6e4);
            break;
          case 0:
            utcOffsetText = dateOffsetToString(toLocalTime(localizedDate).getTimezoneOffset() * -6e4);
            break;
        }
        const sign = utcOffsetText[0] === "-" ? "-" : "+";
        const hours = parseInt(utcOffsetText.substring(1, 3), 10);
        const minutes = parseInt(utcOffsetText.substring(4, 6), 10);
        switch (tokenLength) {
          case 1:
            result += `${sign}${hours}`;
            break;
          case 2:
            result += `${sign}${padWithZeros(hours, 2)}`;
            break;
          default:
            result += `${sign}${padWithZeros(hours, 2)}:${padWithZeros(minutes, 2)}`;
            break;
        }
        break;
      case ":":
        result += ":";
        cursorPos++;
        break;
      case "/":
        result += "/";
        cursorPos++;
        break;
      case "'":
      case '"':
        const [quotedString, quotedStringLenght] = parseQuotedString(format2, cursorPos);
        result += quotedString;
        cursorPos += quotedStringLenght;
        break;
      case "%":
        const nextChar = parseNextChar(format2, cursorPos);
        if (nextChar >= 0 && nextChar !== "%".charCodeAt(0)) {
          cursorPos += 2;
          result += dateToStringWithCustomFormat(localizedDate, String.fromCharCode(nextChar), utc);
        } else {
          throw new Error("Invalid format string");
        }
        break;
      case "\\":
        const nextChar2 = parseNextChar(format2, cursorPos);
        if (nextChar2 >= 0) {
          cursorPos += 2;
          result += String.fromCharCode(nextChar2);
        } else {
          throw new Error("Invalid format string");
        }
        break;
      default:
        cursorPos++;
        result += token;
        break;
    }
  }
  return result;
}
function kind(value2) {
  return value2.kind || 0;
}
function dateOffsetToString(offset) {
  const isMinus = offset < 0;
  offset = Math.abs(offset);
  const hours = ~~(offset / 36e5);
  const minutes = offset % 36e5 / 6e4;
  return (isMinus ? "-" : "+") + padWithZeros(hours, 2) + ":" + padWithZeros(minutes, 2);
}
function dateToHalfUTCString(date, half) {
  const str = date.toISOString();
  return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function dateToISOString(d, utc) {
  if (utc) {
    return d.toISOString();
  } else {
    const printOffset = d.kind == null ? true : d.kind === 2;
    return padWithZeros(d.getFullYear(), 4) + "-" + padWithZeros(d.getMonth() + 1, 2) + "-" + padWithZeros(d.getDate(), 2) + "T" + padWithZeros(d.getHours(), 2) + ":" + padWithZeros(d.getMinutes(), 2) + ":" + padWithZeros(d.getSeconds(), 2) + "." + padWithZeros(d.getMilliseconds(), 3) + (printOffset ? dateOffsetToString(d.getTimezoneOffset() * -6e4) : "");
  }
}
function dateToISOStringWithOffset(dateWithOffset, offset) {
  const str = dateWithOffset.toISOString();
  return str.substring(0, str.length - 1) + dateOffsetToString(offset);
}
function dateToStringWithOffset(date, format2) {
  const d = new Date(date.getTime() + (date.offset ?? 0));
  if (typeof format2 !== "string") {
    return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + dateOffsetToString(date.offset ?? 0);
  } else if (format2.length === 1) {
    switch (format2) {
      case "D":
      case "d":
        return dateToHalfUTCString(d, "first");
      case "T":
      case "t":
        return dateToHalfUTCString(d, "second");
      case "O":
      case "o":
        return dateToISOStringWithOffset(d, date.offset ?? 0);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(d, format2, true);
  }
}
function dateToStringWithKind(date, format2) {
  const utc = date.kind === 1;
  if (typeof format2 !== "string") {
    return utc ? date.toUTCString() : date.toLocaleString();
  } else if (format2.length === 1) {
    switch (format2) {
      case "D":
      case "d":
        return utc ? dateToHalfUTCString(date, "first") : date.toLocaleDateString();
      case "T":
      case "t":
        return utc ? dateToHalfUTCString(date, "second") : date.toLocaleTimeString();
      case "O":
      case "o":
        return dateToISOString(date, utc);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(date, format2, utc);
  }
}
function toString2(date, format2, _provider) {
  return date.offset != null ? dateToStringWithOffset(date, format2) : dateToStringWithKind(date, format2);
}
function DateTime(value2, kind2) {
  const d = new Date(value2);
  d.kind = (kind2 == null ? 0 : kind2) | 0;
  return d;
}
function toLocalTime(date) {
  return date.kind === 2 ? date : DateTime(date.getTime(), 2);
}
function day(d) {
  return d.kind === 1 ? d.getUTCDate() : d.getDate();
}
function hour(d) {
  return d.kind === 1 ? d.getUTCHours() : d.getHours();
}
function millisecond(d) {
  return d.kind === 1 ? d.getUTCMilliseconds() : d.getMilliseconds();
}
function minute(d) {
  return d.kind === 1 ? d.getUTCMinutes() : d.getMinutes();
}
function month(d) {
  return (d.kind === 1 ? d.getUTCMonth() : d.getMonth()) + 1;
}
function second(d) {
  return d.kind === 1 ? d.getUTCSeconds() : d.getSeconds();
}
function dayOfWeek(d) {
  return d.kind === 1 ? d.getUTCDay() : d.getDay();
}

// build/fable_modules/fable-library-js.4.24.0/RegExp.js
function escape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function match(reg, input, startAt = 0) {
  reg.lastIndex = startAt;
  return reg.exec(input);
}

// build/fable_modules/fable-library-js.4.24.0/String.js
var fsFormatRegExp = /(^|[^%])%([0+\- ]*)(\*|\d+)?(?:\.(\d+))?(\w)/g;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:([a-zA-Z])(\d{0,2})|\:(.+?))?\}/g;
function isLessThan(x, y) {
  return compare2(x, y) < 0;
}
function printf(input) {
  return {
    input,
    cont: fsFormat(input)
  };
}
function continuePrint(cont, arg) {
  return typeof arg === "string" ? cont(arg) : arg.cont(cont);
}
function toConsole(arg) {
  return continuePrint((x) => console.log(x), arg);
}
function formatReplacement(rep, flags, padLength, precision, format2) {
  let sign = "";
  flags = flags || "";
  format2 = format2 || "";
  if (isNumeric(rep)) {
    if (format2.toLowerCase() !== "x") {
      if (isLessThan(rep, 0)) {
        rep = multiply(rep, -1);
        sign = "-";
      } else {
        if (flags.indexOf(" ") >= 0) {
          sign = " ";
        } else if (flags.indexOf("+") >= 0) {
          sign = "+";
        }
      }
    }
    precision = precision == null ? null : parseInt(precision, 10);
    switch (format2) {
      case "f":
      case "F":
        precision = precision != null ? precision : 6;
        rep = toFixed(rep, precision);
        break;
      case "g":
      case "G":
        rep = precision != null ? toPrecision(rep, precision) : toPrecision(rep);
        break;
      case "e":
      case "E":
        rep = precision != null ? toExponential(rep, precision) : toExponential(rep);
        break;
      case "x":
        rep = toHex(rep);
        break;
      case "X":
        rep = toHex(rep).toUpperCase();
        break;
      default:
        rep = String(rep);
        break;
    }
  } else if (rep instanceof Date) {
    rep = toString2(rep);
  } else {
    rep = toString(rep);
  }
  padLength = typeof padLength === "number" ? padLength : parseInt(padLength, 10);
  if (!isNaN(padLength)) {
    const zeroFlag = flags.indexOf("0") >= 0;
    const minusFlag = flags.indexOf("-") >= 0;
    const ch = minusFlag || !zeroFlag ? " " : "0";
    if (ch === "0") {
      rep = pad(rep, padLength - sign.length, ch, minusFlag);
      rep = sign + rep;
    } else {
      rep = pad(sign + rep, padLength, ch, minusFlag);
    }
  } else {
    rep = sign + rep;
  }
  return rep;
}
function createPrinter(cont, _strParts, _matches, _result = "", padArg = -1) {
  return (...args) => {
    let result = _result;
    const strParts = _strParts.slice();
    const matches = _matches.slice();
    for (const arg of args) {
      const [, , flags, _padLength, precision, format2] = matches[0];
      let padLength = _padLength;
      if (padArg >= 0) {
        padLength = padArg;
        padArg = -1;
      } else if (padLength === "*") {
        if (arg < 0) {
          throw new Error("Non-negative number required");
        }
        padArg = arg;
        continue;
      }
      result += strParts[0];
      result += formatReplacement(arg, flags, padLength, precision, format2);
      strParts.splice(0, 1);
      matches.splice(0, 1);
    }
    if (matches.length === 0) {
      result += strParts[0];
      return cont(result);
    } else {
      return createPrinter(cont, strParts, matches, result, padArg);
    }
  };
}
function fsFormat(str) {
  return (cont) => {
    fsFormatRegExp.lastIndex = 0;
    const strParts = [];
    const matches = [];
    let strIdx = 0;
    let match2 = fsFormatRegExp.exec(str);
    while (match2) {
      const matchIndex = match2.index + (match2[1] || "").length;
      strParts.push(str.substring(strIdx, matchIndex).replace(/%%/g, "%"));
      matches.push(match2);
      strIdx = fsFormatRegExp.lastIndex;
      fsFormatRegExp.lastIndex -= 1;
      match2 = fsFormatRegExp.exec(str);
    }
    if (strParts.length === 0) {
      return cont(str.replace(/%%/g, "%"));
    } else {
      strParts.push(str.substring(strIdx).replace(/%%/g, "%"));
      return createPrinter(cont, strParts, matches);
    }
  };
}
function format(str, ...args) {
  let str2;
  if (typeof str === "object") {
    str2 = String(args[0]);
    args.shift();
  } else {
    str2 = str;
  }
  return str2.replace(formatRegExp, (_, idx, padLength, format2, precision, pattern) => {
    if (idx < 0 || idx >= args.length) {
      throw new Error("Index must be greater or equal to zero and less than the arguments' length.");
    }
    let rep = args[idx];
    if (isNumeric(rep)) {
      precision = precision == null ? null : parseInt(precision, 10);
      switch (format2) {
        case "f":
        case "F":
          precision = precision != null ? precision : 2;
          rep = toFixed(rep, precision);
          break;
        case "g":
        case "G":
          rep = precision != null ? toPrecision(rep, precision) : toPrecision(rep);
          break;
        case "e":
        case "E":
          rep = precision != null ? toExponential(rep, precision) : toExponential(rep);
          break;
        case "p":
        case "P":
          precision = precision != null ? precision : 2;
          rep = toFixed(multiply(rep, 100), precision) + " %";
          break;
        case "d":
        case "D":
          rep = precision != null ? padLeft(String(rep), precision, "0") : String(rep);
          break;
        case "x":
        case "X":
          rep = precision != null ? padLeft(toHex(rep), precision, "0") : toHex(rep);
          if (format2 === "X") {
            rep = rep.toUpperCase();
          }
          break;
        default:
          if (pattern) {
            let sign = "";
            rep = pattern.replace(/([0#,]+)(\.[0#]+)?/, (_2, intPart, decimalPart) => {
              if (isLessThan(rep, 0)) {
                rep = multiply(rep, -1);
                sign = "-";
              }
              decimalPart = decimalPart == null ? "" : decimalPart.substring(1);
              rep = toFixed(rep, Math.max(decimalPart.length, 0));
              let [repInt, repDecimal] = rep.split(".");
              repDecimal || (repDecimal = "");
              const leftZeroes = intPart.replace(/,/g, "").replace(/^#+/, "").length;
              repInt = padLeft(repInt, leftZeroes, "0");
              const rightZeros = decimalPart.replace(/#+$/, "").length;
              if (rightZeros > repDecimal.length) {
                repDecimal = padRight(repDecimal, rightZeros, "0");
              } else if (rightZeros < repDecimal.length) {
                repDecimal = repDecimal.substring(0, rightZeros) + repDecimal.substring(rightZeros).replace(/0+$/, "");
              }
              if (intPart.indexOf(",") > 0) {
                const i = repInt.length % 3;
                const thousandGroups = Math.floor(repInt.length / 3);
                let thousands = i > 0 ? repInt.substr(0, i) + (thousandGroups > 0 ? "," : "") : "";
                for (let j = 0; j < thousandGroups; j++) {
                  thousands += repInt.substr(i + j * 3, 3) + (j < thousandGroups - 1 ? "," : "");
                }
                repInt = thousands;
              }
              return repDecimal.length > 0 ? repInt + "." + repDecimal : repInt;
            });
            rep = sign + rep;
          }
      }
    } else if (rep instanceof Date) {
      rep = toString2(rep, pattern || format2);
    } else {
      rep = toString(rep);
    }
    padLength = parseInt((padLength || " ").substring(1), 10);
    if (!isNaN(padLength)) {
      rep = pad(String(rep), Math.abs(padLength), " ", padLength < 0);
    }
    return rep;
  });
}
function isNullOrEmpty(str) {
  return typeof str !== "string" || str.length === 0;
}
function join(delimiter, xs) {
  if (Array.isArray(xs)) {
    return xs.join(delimiter);
  } else {
    return Array.from(xs).join(delimiter);
  }
}
function pad(str, len, ch, isRight) {
  ch = ch || " ";
  len = len - str.length;
  for (let i = 0; i < len; i++) {
    str = isRight ? str + ch : ch + str;
  }
  return str;
}
function padLeft(str, len, ch) {
  return pad(str, len, ch);
}
function padRight(str, len, ch) {
  return pad(str, len, ch, true);
}
function split(str, splitters, count, options) {
  count = typeof count === "number" ? count : void 0;
  options = typeof options === "number" ? options : 0;
  if (count && count < 0) {
    throw new Error("Count cannot be less than zero");
  }
  if (count === 0) {
    return [];
  }
  const removeEmpty = (options & 1) === 1;
  const trim = (options & 2) === 2;
  splitters = splitters || [];
  splitters = splitters.filter((x) => x).map(escape);
  splitters = splitters.length > 0 ? splitters : ["\\s"];
  const splits = [];
  const reg = new RegExp(splitters.join("|"), "g");
  let findSplits = true;
  let i = 0;
  do {
    const match2 = reg.exec(str);
    if (match2 === null) {
      const candidate = trim ? str.substring(i).trim() : str.substring(i);
      if (!removeEmpty || candidate.length > 0) {
        splits.push(candidate);
      }
      findSplits = false;
    } else {
      const candidate = trim ? str.substring(i, match2.index).trim() : str.substring(i, match2.index);
      if (!removeEmpty || candidate.length > 0) {
        if (count != null && splits.length + 1 === count) {
          splits.push(trim ? str.substring(i).trim() : str.substring(i));
          findSplits = false;
        } else {
          splits.push(candidate);
        }
      }
      i = reg.lastIndex;
    }
  } while (findSplits);
  return splits;
}
function substring(str, startIndex, length3) {
  if (startIndex + (length3 || 0) > str.length) {
    throw new Error("Invalid startIndex and/or length");
  }
  return length3 != null ? str.substr(startIndex, length3) : str.substr(startIndex);
}

// build/fable_modules/fable-library-js.4.24.0/Option.js
var Some = class {
  constructor(value2) {
    this.value = value2;
  }
  toJSON() {
    return this.value;
  }
  toString() {
    return String(this.value);
  }
  GetHashCode() {
    return structuralHash(this.value);
  }
  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return equals(this.value, other instanceof Some ? other.value : other);
    }
  }
  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return compare(this.value, other instanceof Some ? other.value : other);
    }
  }
};
function value(x) {
  if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x instanceof Some ? x.value : x;
  }
}
function some(x) {
  return x == null || x instanceof Some ? new Some(x) : x;
}
function defaultArg(opt, defaultValue) {
  return opt != null ? value(opt) : defaultValue;
}
function map(mapping, opt) {
  return opt != null ? some(mapping(value(opt))) : void 0;
}
function bind(binder, opt) {
  return opt != null ? binder(value(opt)) : void 0;
}

// build/fable_modules/fable-library-js.4.24.0/Global.js
var SR_inputWasEmpty = "Collection was empty.";

// build/fable_modules/fable-library-js.4.24.0/Native.js
function Helpers_allocateArrayFromCons(cons2, len) {
  if (typeof cons2 === "function") {
    return new cons2(len);
  } else {
    return new Array(len);
  }
}

// build/fable_modules/fable-library-js.4.24.0/Double.js
function min(x, y) {
  return x < y ? x : y;
}

// build/fable_modules/fable-library-js.4.24.0/Array.js
function fill(target, targetIndex, count, value2) {
  const start = targetIndex | 0;
  return target.fill(value2, start, start + count);
}
function singleton(value2, cons2) {
  const ar = Helpers_allocateArrayFromCons(cons2, 1);
  setItem(ar, 0, value2);
  return ar;
}
function pairwise(array) {
  if (array.length < 2) {
    return [];
  } else {
    const count = array.length - 1 | 0;
    const result = new Array(count);
    for (let i = 0; i <= count - 1; i++) {
      setItem(result, i, [item(i, array), item(i + 1, array)]);
    }
    return result;
  }
}
function reverse(array) {
  const array_2 = array.slice();
  return array_2.reverse();
}
function item(index, array) {
  if (index < 0 ? true : index >= array.length) {
    throw new Error("Index was outside the bounds of the array.\\nParameter name: index");
  } else {
    return array[index];
  }
}
function setItem(array, index, value2) {
  if (index < 0 ? true : index >= array.length) {
    throw new Error("Index was outside the bounds of the array.\\nParameter name: index");
  } else {
    array[index] = value2;
  }
}

// build/fable_modules/fable-library-js.4.24.0/List.js
var FSharpList = class extends Record {
  constructor(head2, tail2) {
    super();
    this.head = head2;
    this.tail = tail2;
  }
  toString() {
    const xs = this;
    return "[" + join("; ", xs) + "]";
  }
  Equals(other) {
    const xs = this;
    if (xs === other) {
      return true;
    } else {
      const loop = (xs_1_mut, ys_1_mut) => {
        loop:
          while (true) {
            const xs_1 = xs_1_mut, ys_1 = ys_1_mut;
            const matchValue = xs_1.tail;
            const matchValue_1 = ys_1.tail;
            if (matchValue != null) {
              if (matchValue_1 != null) {
                const xt = value(matchValue);
                const yt = value(matchValue_1);
                if (equals(xs_1.head, ys_1.head)) {
                  xs_1_mut = xt;
                  ys_1_mut = yt;
                  continue loop;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            } else if (matchValue_1 != null) {
              return false;
            } else {
              return true;
            }
            break;
          }
      };
      return loop(xs, other);
    }
  }
  GetHashCode() {
    const xs = this;
    const loop = (i_mut, h_mut, xs_1_mut) => {
      loop:
        while (true) {
          const i = i_mut, h = h_mut, xs_1 = xs_1_mut;
          const matchValue = xs_1.tail;
          if (matchValue != null) {
            const t = value(matchValue);
            if (i > 18) {
              return h | 0;
            } else {
              i_mut = i + 1;
              h_mut = (h << 1) + structuralHash(xs_1.head) + 631 * i;
              xs_1_mut = t;
              continue loop;
            }
          } else {
            return h | 0;
          }
          break;
        }
    };
    return loop(0, 0, xs) | 0;
  }
  toJSON() {
    const this$ = this;
    return Array.from(this$);
  }
  CompareTo(other) {
    const xs = this;
    const loop = (xs_1_mut, ys_1_mut) => {
      loop:
        while (true) {
          const xs_1 = xs_1_mut, ys_1 = ys_1_mut;
          const matchValue = xs_1.tail;
          const matchValue_1 = ys_1.tail;
          if (matchValue != null) {
            if (matchValue_1 != null) {
              const xt = value(matchValue);
              const yt = value(matchValue_1);
              const c = compare(xs_1.head, ys_1.head) | 0;
              if (c === 0) {
                xs_1_mut = xt;
                ys_1_mut = yt;
                continue loop;
              } else {
                return c | 0;
              }
            } else {
              return 1;
            }
          } else if (matchValue_1 != null) {
            return -1;
          } else {
            return 0;
          }
          break;
        }
    };
    return loop(xs, other) | 0;
  }
  GetEnumerator() {
    const xs = this;
    return ListEnumerator$1_$ctor_3002E699(xs);
  }
  [Symbol.iterator]() {
    return toIterator(getEnumerator(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const xs = this;
    return getEnumerator(xs);
  }
};
var ListEnumerator$1 = class {
  constructor(xs) {
    this.xs = xs;
    this.it = this.xs;
    this.current = defaultOf();
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current;
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    const matchValue = _.it.tail;
    if (matchValue != null) {
      const t = value(matchValue);
      _.current = _.it.head;
      _.it = t;
      return true;
    } else {
      return false;
    }
  }
  "System.Collections.IEnumerator.Reset"() {
    const _ = this;
    _.it = _.xs;
    _.current = defaultOf();
  }
  Dispose() {
  }
};
function ListEnumerator$1_$ctor_3002E699(xs) {
  return new ListEnumerator$1(xs);
}
function FSharpList_get_Empty() {
  return new FSharpList(defaultOf(), void 0);
}
function FSharpList_Cons_305B8EAC(x, xs) {
  return new FSharpList(x, xs);
}
function FSharpList__get_IsEmpty(xs) {
  return xs.tail == null;
}
function FSharpList__get_Length(xs) {
  const loop = (i_mut, xs_1_mut) => {
    loop:
      while (true) {
        const i = i_mut, xs_1 = xs_1_mut;
        const matchValue = xs_1.tail;
        if (matchValue != null) {
          i_mut = i + 1;
          xs_1_mut = value(matchValue);
          continue loop;
        } else {
          return i | 0;
        }
        break;
      }
  };
  return loop(0, xs) | 0;
}
function FSharpList__get_Head(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return xs.head;
  } else {
    throw new Error(SR_inputWasEmpty + "\\nParameter name: list");
  }
}
function FSharpList__get_Tail(xs) {
  const matchValue = xs.tail;
  if (matchValue != null) {
    return value(matchValue);
  } else {
    throw new Error(SR_inputWasEmpty + "\\nParameter name: list");
  }
}
function empty() {
  return FSharpList_get_Empty();
}
function cons(x, xs) {
  return FSharpList_Cons_305B8EAC(x, xs);
}
function isEmpty(xs) {
  return FSharpList__get_IsEmpty(xs);
}
function length(xs) {
  return FSharpList__get_Length(xs);
}
function head(xs) {
  return FSharpList__get_Head(xs);
}
function tail(xs) {
  return FSharpList__get_Tail(xs);
}
function toArray(xs) {
  const len = FSharpList__get_Length(xs) | 0;
  const res = fill(new Array(len), 0, len, null);
  const loop = (i_mut, xs_1_mut) => {
    loop:
      while (true) {
        const i = i_mut, xs_1 = xs_1_mut;
        if (!FSharpList__get_IsEmpty(xs_1)) {
          setItem(res, i, FSharpList__get_Head(xs_1));
          i_mut = i + 1;
          xs_1_mut = FSharpList__get_Tail(xs_1);
          continue loop;
        }
        break;
      }
  };
  loop(0, xs);
  return res;
}
function fold(folder, state, xs) {
  let acc = state;
  let xs_1 = xs;
  while (!FSharpList__get_IsEmpty(xs_1)) {
    acc = folder(acc, head(xs_1));
    xs_1 = FSharpList__get_Tail(xs_1);
  }
  return acc;
}
function ofArrayWithTail(xs, tail_1) {
  let res = tail_1;
  for (let i = xs.length - 1; i >= 0; i--) {
    res = FSharpList_Cons_305B8EAC(item(i, xs), res);
  }
  return res;
}
function ofArray(xs) {
  return ofArrayWithTail(xs, FSharpList_get_Empty());
}
function map3(mapping, xs) {
  const root = FSharpList_get_Empty();
  const node = fold((acc, x) => {
    const t = new FSharpList(mapping(x), void 0);
    acc.tail = t;
    return t;
  }, root, xs);
  const t_2 = FSharpList_get_Empty();
  node.tail = t_2;
  return FSharpList__get_Tail(root);
}
function forAll(f, xs) {
  return fold((acc, x) => acc && f(x), true, xs);
}
function skipWhile(predicate_mut, xs_mut) {
  skipWhile:
    while (true) {
      const predicate = predicate_mut, xs = xs_mut;
      if (FSharpList__get_IsEmpty(xs)) {
        return xs;
      } else if (!predicate(FSharpList__get_Head(xs))) {
        return xs;
      } else {
        predicate_mut = predicate;
        xs_mut = FSharpList__get_Tail(xs);
        continue skipWhile;
      }
      break;
    }
}

// build/fable_modules/Fable.Promise.3.1.3/Promise.fs.js
var PromiseBuilder = class {
  constructor() {
  }
};
function PromiseBuilder_$ctor() {
  return new PromiseBuilder();
}
function PromiseBuilder__Delay_62FBFDE1(_, generator) {
  return {
    then: (onSuccess, onError) => {
      try {
        return generator().then(onSuccess, onError);
      } catch (er) {
        if (onError == null) {
          return Promise.reject(er);
        } else {
          try {
            const a = onError(er);
            return Promise.resolve(a);
          } catch (er_1) {
            return Promise.reject(er_1);
          }
        }
      }
    },
    catch: (onError_1) => {
      try {
        return generator().catch(onError_1);
      } catch (er_2) {
        try {
          const a_1 = onError_1(er_2);
          return Promise.resolve(a_1);
        } catch (er_3) {
          return Promise.reject(er_3);
        }
      }
    }
  };
}
function PromiseBuilder__Run_212F1D4B(_, p) {
  return p.then((x) => x);
}

// build/fable_modules/Fable.Promise.3.1.3/PromiseImpl.fs.js
var promise = PromiseBuilder_$ctor();

// build/Settings.js
var PluginSettings = class extends Record {
  constructor(defaultCodeBlockLanguage, defaultCalloutType, use3BackticksForCodeBlock, defaultModalCommand) {
    super();
    this.defaultCodeBlockLanguage = defaultCodeBlockLanguage;
    this.defaultCalloutType = defaultCalloutType;
    this.use3BackticksForCodeBlock = use3BackticksForCodeBlock;
    this.defaultModalCommand = defaultModalCommand;
  }
};
function PluginSettings_$reflection() {
  return record_type("Fs.Obsidian.PluginSettings", [], PluginSettings, () => [["defaultCodeBlockLanguage", string_type], ["defaultCalloutType", string_type], ["use3BackticksForCodeBlock", bool_type], ["defaultModalCommand", string_type]]);
}
function PluginSettings_get_Default() {
  return new PluginSettings("bash", "info", false, "obsidian-another-quick-switcher:search-command_recent-search");
}
function Gen_PluginSettings_setFieldByName(key, value2, x) {
  switch (key) {
    case "defaultCodeBlockLanguage":
      return new PluginSettings(value2, x.defaultCalloutType, x.use3BackticksForCodeBlock, x.defaultModalCommand);
    case "defaultCalloutType":
      return new PluginSettings(x.defaultCodeBlockLanguage, value2, x.use3BackticksForCodeBlock, x.defaultModalCommand);
    case "use3BackticksForCodeBlock":
      return new PluginSettings(x.defaultCodeBlockLanguage, x.defaultCalloutType, value2, x.defaultModalCommand);
    case "defaultModalCommand":
      return new PluginSettings(x.defaultCodeBlockLanguage, x.defaultCalloutType, x.use3BackticksForCodeBlock, value2);
    default:
      throw new Error(`unimplemented case ${key}`);
  }
}

// build/fable_modules/fable-library-js.4.24.0/System.Text.js
var StringBuilder = class {
  constructor(value2, capacity) {
    this.buf = [];
    if (!isNullOrEmpty(value2)) {
      void this.buf.push(value2);
    }
  }
  toString() {
    const _ = this;
    return join("", _.buf);
  }
};
function StringBuilder_$ctor_Z18115A39(value2, capacity) {
  return new StringBuilder(value2, capacity);
}
function StringBuilder_$ctor_Z721C83C5(value2) {
  return StringBuilder_$ctor_Z18115A39(value2, 16);
}
function StringBuilder__Append_Z721C83C5(x, s) {
  void x.buf.push(s);
  return x;
}
function StringBuilder__Append_244C7CD6(x, c) {
  void x.buf.push(c);
  return x;
}

// build/fable_modules/fable-library-js.4.24.0/FSharp.Core.js
function Operators_NullArg(x) {
  throw new Error(x);
}

// build/fable_modules/fable-library-js.4.24.0/Seq.js
var SR_enumerationAlreadyFinished = "Enumeration already finished.";
var SR_enumerationNotStarted = "Enumeration has not started. Call MoveNext.";
var SR_keyNotFoundAlt2 = "An index satisfying the predicate was not found in the collection.";
var SR_resetNotSupported = "Reset is not supported on this enumerator.";
function Enumerator_noReset() {
  throw new Error(SR_resetNotSupported);
}
function Enumerator_notStarted() {
  throw new Error(SR_enumerationNotStarted);
}
function Enumerator_alreadyFinished() {
  throw new Error(SR_enumerationAlreadyFinished);
}
var Enumerator_Seq = class {
  constructor(f) {
    this.f = f;
  }
  toString() {
    const xs = this;
    let i = 0;
    let str = "seq [";
    const e = getEnumerator(xs);
    try {
      while (i < 4 && e["System.Collections.IEnumerator.MoveNext"]()) {
        if (i > 0) {
          str = str + "; ";
        }
        str = str + toString(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
        i = i + 1 | 0;
      }
      if (i === 4) {
        str = str + "; ...";
      }
      return str + "]";
    } finally {
      disposeSafe(e);
    }
  }
  GetEnumerator() {
    const x = this;
    return x.f();
  }
  [Symbol.iterator]() {
    return toIterator(getEnumerator(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const x = this;
    return x.f();
  }
};
function Enumerator_Seq_$ctor_673A07F2(f) {
  return new Enumerator_Seq(f);
}
var Enumerator_FromFunctions$1 = class {
  constructor(current, next, dispose) {
    this.current = current;
    this.next = next;
    this.dispose = dispose;
  }
  "System.Collections.Generic.IEnumerator`1.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.get_Current"() {
    const _ = this;
    return _.current();
  }
  "System.Collections.IEnumerator.MoveNext"() {
    const _ = this;
    return _.next();
  }
  "System.Collections.IEnumerator.Reset"() {
    Enumerator_noReset();
  }
  Dispose() {
    const _ = this;
    _.dispose();
  }
};
function Enumerator_FromFunctions$1_$ctor_58C54629(current, next, dispose) {
  return new Enumerator_FromFunctions$1(current, next, dispose);
}
function Enumerator_concat(sources) {
  let outerOpt = void 0;
  let innerOpt = void 0;
  let started = false;
  let finished = false;
  let curr = void 0;
  const finish = () => {
    finished = true;
    if (innerOpt != null) {
      const inner = value(innerOpt);
      try {
        disposeSafe(inner);
      } finally {
        innerOpt = void 0;
      }
    }
    if (outerOpt != null) {
      const outer = value(outerOpt);
      try {
        disposeSafe(outer);
      } finally {
        outerOpt = void 0;
      }
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    } else if (finished) {
      Enumerator_alreadyFinished();
    }
    if (curr != null) {
      return value(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    let copyOfStruct;
    if (!started) {
      started = true;
    }
    if (finished) {
      return false;
    } else {
      let res = void 0;
      while (res == null) {
        const outerOpt_1 = outerOpt;
        const innerOpt_1 = innerOpt;
        if (outerOpt_1 != null) {
          if (innerOpt_1 != null) {
            const inner_1 = value(innerOpt_1);
            if (inner_1["System.Collections.IEnumerator.MoveNext"]()) {
              curr = some(inner_1["System.Collections.Generic.IEnumerator`1.get_Current"]());
              res = true;
            } else {
              try {
                disposeSafe(inner_1);
              } finally {
                innerOpt = void 0;
              }
            }
          } else {
            const outer_1 = value(outerOpt_1);
            if (outer_1["System.Collections.IEnumerator.MoveNext"]()) {
              const ie = outer_1["System.Collections.Generic.IEnumerator`1.get_Current"]();
              innerOpt = (copyOfStruct = ie, getEnumerator(copyOfStruct));
            } else {
              finish();
              res = false;
            }
          }
        } else {
          outerOpt = getEnumerator(sources);
        }
      }
      return value(res);
    }
  }, () => {
    if (!finished) {
      finish();
    }
  });
}
function Enumerator_enumerateThenFinally(f, e) {
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => e["System.Collections.Generic.IEnumerator`1.get_Current"](), () => e["System.Collections.IEnumerator.MoveNext"](), () => {
    try {
      disposeSafe(e);
    } finally {
      f();
    }
  });
}
function Enumerator_generateWhileSome(openf, compute, closef) {
  let started = false;
  let curr = void 0;
  let state = some(openf());
  const dispose = () => {
    if (state != null) {
      const x_1 = value(state);
      try {
        closef(x_1);
      } finally {
        state = void 0;
      }
    }
  };
  const finish = () => {
    try {
      dispose();
    } finally {
      curr = void 0;
    }
  };
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (!started) {
      Enumerator_notStarted();
    }
    if (curr != null) {
      return value(curr);
    } else {
      return Enumerator_alreadyFinished();
    }
  }, () => {
    if (!started) {
      started = true;
    }
    if (state != null) {
      const s = value(state);
      let matchValue_1;
      try {
        matchValue_1 = compute(s);
      } catch (matchValue) {
        finish();
        throw matchValue;
      }
      if (matchValue_1 != null) {
        curr = matchValue_1;
        return true;
      } else {
        finish();
        return false;
      }
    } else {
      return false;
    }
  }, dispose);
}
function Enumerator_unfold(f, state) {
  let curr = void 0;
  let acc = state;
  return Enumerator_FromFunctions$1_$ctor_58C54629(() => {
    if (curr != null) {
      const x = value(curr)[0];
      const st = value(curr)[1];
      return x;
    } else {
      return Enumerator_notStarted();
    }
  }, () => {
    curr = f(acc);
    if (curr != null) {
      const x_1 = value(curr)[0];
      const st_1 = value(curr)[1];
      acc = st_1;
      return true;
    } else {
      return false;
    }
  }, () => {
  });
}
function indexNotFound() {
  throw new Error(SR_keyNotFoundAlt2);
}
function checkNonNull(argName, arg) {
  if (arg == null) {
    Operators_NullArg(argName);
  }
}
function mkSeq(f) {
  return Enumerator_Seq_$ctor_673A07F2(f);
}
function ofSeq2(xs) {
  checkNonNull("source", xs);
  return getEnumerator(xs);
}
function delay(generator) {
  return mkSeq(() => getEnumerator(generator()));
}
function concat(sources) {
  return mkSeq(() => Enumerator_concat(sources));
}
function unfold(generator, state) {
  return mkSeq(() => Enumerator_unfold(generator, state));
}
function empty2() {
  return delay(() => new Array(0));
}
function singleton2(x) {
  return delay(() => singleton(x));
}
function ofArray2(arr) {
  return arr;
}
function toArray2(xs) {
  if (xs instanceof FSharpList) {
    const a = xs;
    return toArray(a);
  } else {
    return Array.from(xs);
  }
}
function generate(create2, compute, dispose) {
  return mkSeq(() => Enumerator_generateWhileSome(create2, compute, dispose));
}
function append(xs, ys) {
  return concat([xs, ys]);
}
function choose(chooser, xs) {
  return generate(() => ofSeq2(xs), (e) => {
    let curr = void 0;
    while (curr == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      curr = chooser(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return curr;
  }, (e_1) => {
    disposeSafe(e_1);
  });
}
function enumerateUsing(resource, source) {
  const compensation = () => {
    if (equals(resource, defaultOf())) {
    } else {
      let copyOfStruct = resource;
      disposeSafe(copyOfStruct);
    }
  };
  return mkSeq(() => {
    try {
      return Enumerator_enumerateThenFinally(compensation, ofSeq2(source(resource)));
    } catch (matchValue_1) {
      compensation();
      throw matchValue_1;
    }
  });
}
function enumerateWhile(guard, xs) {
  return concat(unfold((i) => guard() ? [xs, i + 1] : void 0, 0));
}
function filter(f, xs) {
  return choose((x) => {
    if (f(x)) {
      return some(x);
    } else {
      return void 0;
    }
  }, xs);
}
function exists(predicate, xs) {
  const e = ofSeq2(xs);
  try {
    let found = false;
    while (!found && e["System.Collections.IEnumerator.MoveNext"]()) {
      found = predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return found;
  } finally {
    disposeSafe(e);
  }
}
function tryFind(predicate, xs) {
  const e = ofSeq2(xs);
  try {
    let res = void 0;
    while (res == null && e["System.Collections.IEnumerator.MoveNext"]()) {
      const c = e["System.Collections.Generic.IEnumerator`1.get_Current"]();
      if (predicate(c)) {
        res = some(c);
      }
    }
    return res;
  } finally {
    disposeSafe(e);
  }
}
function find(predicate, xs) {
  const matchValue = tryFind(predicate, xs);
  if (matchValue == null) {
    return indexNotFound();
  } else {
    return value(matchValue);
  }
}
function tryFindIndex(predicate, xs) {
  const e = ofSeq2(xs);
  try {
    const loop = (i_mut) => {
      loop:
        while (true) {
          const i = i_mut;
          if (e["System.Collections.IEnumerator.MoveNext"]()) {
            if (predicate(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) {
              return i;
            } else {
              i_mut = i + 1;
              continue loop;
            }
          } else {
            return void 0;
          }
          break;
        }
    };
    return loop(0);
  } finally {
    disposeSafe(e);
  }
}
function fold2(folder, state, xs) {
  const e = ofSeq2(xs);
  try {
    let acc = state;
    while (e["System.Collections.IEnumerator.MoveNext"]()) {
      acc = folder(acc, e["System.Collections.Generic.IEnumerator`1.get_Current"]());
    }
    return acc;
  } finally {
    disposeSafe(e);
  }
}
function iterate(action, xs) {
  fold2((unitVar, x) => {
    action(x);
  }, void 0, xs);
}
function iterateIndexed(action, xs) {
  fold2((i, x) => {
    action(i, x);
    return i + 1 | 0;
  }, 0, xs);
}
function length2(xs) {
  if (isArrayLike(xs)) {
    const a = xs;
    return a.length | 0;
  } else if (xs instanceof FSharpList) {
    return length(xs) | 0;
  } else {
    const e = ofSeq2(xs);
    try {
      let count = 0;
      while (e["System.Collections.IEnumerator.MoveNext"]()) {
        count = count + 1 | 0;
      }
      return count | 0;
    } finally {
      disposeSafe(e);
    }
  }
}
function map4(mapping, xs) {
  return generate(() => ofSeq2(xs), (e) => e["System.Collections.IEnumerator.MoveNext"]() ? some(mapping(e["System.Collections.Generic.IEnumerator`1.get_Current"]())) : void 0, (e_1) => {
    disposeSafe(e_1);
  });
}
var CachedSeq$1 = class {
  constructor(cleanup, res) {
    this.cleanup = cleanup;
    this.res = res;
  }
  Dispose() {
    const _ = this;
    _.cleanup();
  }
  GetEnumerator() {
    const _ = this;
    return getEnumerator(_.res);
  }
  [Symbol.iterator]() {
    return toIterator(getEnumerator(this));
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const _ = this;
    return getEnumerator(_.res);
  }
};
function reverse2(xs) {
  return delay(() => ofArray2(reverse(toArray2(xs))));
}
function collect(mapping, xs) {
  return delay(() => concat(map4(mapping, xs)));
}
function where(predicate, xs) {
  return filter(predicate, xs);
}
function pairwise2(xs) {
  return delay(() => ofArray2(pairwise(toArray2(xs))));
}
function sortWith(comparer, xs) {
  return delay(() => {
    const arr = toArray2(xs);
    arr.sort(comparer);
    return ofArray2(arr);
  });
}
function sortByDescending(projection, xs, comparer) {
  return sortWith((x, y) => comparer.Compare(projection(x), projection(y)) * -1, xs);
}

// build/fable_modules/fable-library-js.4.24.0/Unicode.13.0.0.js
var rangeDeltas = "#C$&$&$$$$$$%-%&%=$$$$$$=$$$$D$$'$$$$$$$$$$$$%$$%$$$$&$:$*;$+$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%$$$$$$$$$$$$$$$%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%$$$$&%$$$%$&%'$%$&&%$%$$$$$%$$%$$%$&$$$%%$$&'$$$$$$$$$$$$$$$$$$$$$$$$%$$$$$$$$$$$$$$$$$%$$$$$&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*%$%%$$'$$$$$$$$h$>5'/1(*$$$4\x93$$$$$$$$%$&$$'%$$&$$$%$4$,F$%&&$$$$$$$$$$$$$$$$$$$$$$$($$$$$%%VS$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$(%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%$$$$$$$$$$$$%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$I%$)L$$%%$$P$$$%$%$$+>''%.)&%$%%.$$$%C$-8-'%$\x86$$*$$)%%$'%-&%$1$$$$A>%|.$1-D,%$&$%$%9'$,$&$(%2$<&%$$.X8$5.2$C$Y$$$$&+'$%$*-%%-$$2$%$+%%%9$*$$&'%$$&'%%%%$$+$'%$&%%-%%)$$$$$%%$$)'%%9$*$%$%$%%$$&%'%%&&$*'$$*-%&$$-%$$,$&$9$*$%$(%$$&($%$$%$%$2%%%-$$*$)$$%$+%%%9$*$%$(%$$$$$'%%%%$*%$'%$&%%-$$)-$$$)&&$'&%$$$%&%&&&/'%$%&&$&$%$)$1-&)$$($&$+$&$:$3&$&'$&$'*%$&(%%%-*$*$$$%$+$&$:$-$(%$$$$($$%$%%*%*$$%%%-$%0%%,$&$L%$&'$&$&$$$'&$*&%%-,$)$$%$5&;$,$$%*&$'&&$$$+)-%%$/S$%*'$)$+$-%H%$$$($;$$$-$%,$%($$$)%-%'C$&2$$&%)--$$$$$$$$$$%+$G'1$($%(.$G$+$)$%('%HN%'$)$%%%$-))%%'&$&%*&'0$%%)$$$-&$%I$$($%N$$&\u016C$'%*$$$'%L$'%D$'%*$$$'%2$\\$'%f%&,7&3-)y%)%$\u028F$$4$=$$&n&&+*0$'&.5&%,5%/0$&$%/W%$*+$%.&$&$$$%-)-))$'&$$-)F$X*(%E$$(i-B$&'%&'%$)&'$&%-A%(.O'=)-$&E:%%$%%X$$$*$$$$%+)-%$-)-)*$)%1$%b'$R$$($$($%*'-*-,,&%$A$'%%$&%-O$$%&$$&%+'G++%%&(-&&-A)%,*N%&++&$0$*'$)$%$%$(Ob0$EH]$($$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$,$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$,+)%)%++++)%)%+$$$$$$$$++1%++++++($%'$$$&&$%'$&'%%'$&+(&%&$%'$%$.()%$$$%$$$+$$($,$$'%&$$$.$$$-$($-$$%)&$$$-&$$$0&C30'$&/2%$'$%$&%&$$$%$()$$$$$$'$$'$'$%%%($'$$%$$3F$$'$%'((%'$%$%$*$B%%$$$B\u012F+$$$$7%*$$t$A<K)h<.8_q9\xDA$,$Y+\x92$\u011B$$$$$$$$$$$$$$AO($$B$$$$$$$$$$3\u0123\xA6$$$$$$$$$$$$$$$$$$$$$$b$$$$C$$\u0125S8%)J%C$\x8CR$R$$$&%$$$$$$'$$%$)%&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%)$$$$&$$('$%I$$($%[*$$1$:,*$*$*$*$*$*$*$*$C%$$$$&$$$$$,$%$$$$%$$$$$$$$$$($-%'$$$0%$P=$|/\xF9=/'$&$$$$$$$$$$$$$$%$$$$$$$$$$%$,'%$(%&$$$%$y%%%%$$}$&$(N$\x81$%'-CG/3B$-A+$2C-J2\u0163\u19E3c\u5220&8$\u049A&Z,K)%\u012F$&3-%7$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&$-$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%%i-%)+:,%$$$$$$$$$$$$$&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+$$$$%$$$$$$$$$$%$$$$$$$$&$$$$$$$$$$$$$$$$$$$$($($$$$$$$$$$$%$$'$$$M$$$%$*$&$'$:%%$'$&)%$$)W'+%U3%+%-)5)&$$%$-?+%:.%.$@&&$R$%'%%&0$$-'%($$,-($L)%%%%,&$+$$%-%'3$)&$$$$U$$&%%(%$$$;%$%.$%%%$%$$-)%)%),*$*$N$',$%'sF%$%$%$$$%-)\u2BC7/:'T'\u0823\u1923\u0191%\x8DI*/(($$-$0$($$$%$%$\x8F34\u018E$$3c%YK/$$%3*$$$)3$%%$$$$$$$$$$$$$$$$%$$'&&$'$$$$$$$&$$&$$$%'($\xAA%$$&$&$$$$$$%-%&%=$$$$$$=$$$$$$$$$%-$P%B&)%)%)%&&%$$$%$$'%-&%%/$=$6$%$2%1E\x9E(&'P&,X'4%&$0&$RP$\xA5@&T2$>'C',7$+$(I((A$$G'+$(MKKq%-)G'G'K+W.$\xB3\u015A,9-+\xBB)%$$O$%&$%:$$+:%*B+,S6$%((9)&$=($c['%%3%Q$&$%(''$&$@%&'$,*,*@%$@&C+$?%'(*,Y&*9%+6(+5*'/*slZV0V*)G'+-\u0149B$M$%$%%q@-$+9.'(y8*7:,$$$X2*'7-2&$P&'%%%$'.$%<*-)&G($+$-'$%$+F$%$,%$S&,%'''$$$-$$$&$7.5$<&&%$$%)$d*$$$'$2$-$)R$&+(-)%%$+%%%9$*$%$($%$%$'%%%&%$)$((%%*&(\xAEX&+%&$$'(-%$$$&AS&)$$'%$%%$$+-\xC9R&'%'%$%:'%ES&+%$$%&$.-)06N$$$%)$$$*-Y>%&%'$('-%&$\xE3O&,$%$\x87CC-,/+%$%+$%$;)$%%%$$$$$$$&,-i+%J&'%%'$$$$$>$-K)$$'+$+$)%&Q0$%&$(@\\\u012A,$H$*$)$$$(--6&%A%9$$*$%$%l*$%$I)&$$%$*$$+-))$%$C($%$%$$$$*-\u01596%%%\xDA$28+'40$\u03BD\x89\x92$(.\xE7\u0ADF\u0452$,\u0FEA\u026A\u21DC\u025C*B$-'%\x83A%($-S*(''$$--$*$8(6\u02D3CC:'\x88n'$$Z*'0c%$$$.%1\u181B+\u04F9M,\u231A\u0142T&4'+\u01AF\u0927\x8E(0&,*-%$%$'\u137F\u0119-J%_%&&)++%*A'^:e&$\xBD7/z,<\xAA===*$5==$$%%$%%%'$+'$$$*$.==%$'%+$*$=%$'$($$&*$============?%<$<$)<$<$)<$<$)<$<$)<$<$)$$%U\u0223Z'U+$1$%(2($2\u0573*$4%*$%$(\xF8P&**%-'$$\u0193O'-($\u0523\xE8%,*LEE*$'-'%\u0334^$&$'oP$2\xE5'$>$%$$%$$-$'$$$$)$'$$$$$$&$%$$%$$$$$$$$$$%$$%'$*$'$'$$$-$4(&$($4W%\u0131O'\x87/2%2$2$H-0\xC4[@0O',*%1)\xBD\u011E(\u02FB+0&0&\x97/|*/7/'[+-)K+A%%q\x9C$u$\xAA/1%(&&(*,<**,&0*L\xB6$ZH-\u0429\uA701E\u1058.\u0101%\u16A51\u1D54\u0C42\u0241\u0605\u136E\u{AECD9}$A\x83\xA3\u0113\uFE33\u{10021}%\u{10021}";
var categories = "1.;=;78;<;6;+;<;#7;8>5>$7<8<1.;=?;>?'9<2?>?<->$;>-':-;#<#$<$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$'#$'#%$#%$#%$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#%$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$'$&>&>&>&>&>(#$#$&>#$@&$;#@>#;#@#@#$#@#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$<#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$?(*#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$@#@&;$;6@?=@(6(;(;(;(@'@';@2<;=;?(;2@;'&'(+;'(';'(2?(&(?('+'?';@2'('(@'('@+'(&?;&@(='(&(&(&(@;@'(@;@'@'@'@(2()'()(')()()'('(;+;&'()@'@'@'@'@'@'@(')(@)@)('@)@'@'(@+'=-?=';(@()@'@'@'@'@'@'@'@(@)(@(@(@(@'@'@+('(;@()@'@'@'@'@'@'@(')(@()@)(@'@'(@+;=@'(@()@'@'@'@'@'@'@(')()(@)@)(@()@'@'(@+?'-@('@'@'@'@'@'@'@'@'@'@)()@)@)(@'@)@+-?=?@()('@'@'@'@'()@(@(@(@'@'(@+@;-?'();'@'@'@'@'@(')()@()@)(@)@'@'(@+@'@()'@'@'(')(@)@)('?@')-'(@+-?'@()@'@'@'@'@'@(@)(@(@)@+@);@'('(@='&(;+;@'@'@'@'@'@'('('@'@&@(@+@'@'?;?;?(?+-?(?(?(7878)'@'@()(;('(@(@?(?@?;?;@')()()()('+;')('(')')'('()()(')+)(?#@#@#@$;&$'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@(;-@'?@#@$@6'?;'.'78@';,'@'@'(@'(;@'(@'@'@(@'()()()(;&;='(@+@-@;6;(2@+@'&'@'('('@'@'@()()@)()(@?@;+'@'@'@'@+-@?'()(@;')()(@()()()(@(+@+@;&;@(*(@()'()()()()'@+;?(?@()')()()('+'()()()()@;')()(@;+@'+'&;$@#@#;@(;()('('(')('@$&$&$&(@(#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$@#@$#$#$@#@$@#@#@#@#$#$@$%$%$%$@$#%>$>$@$#%>$@$#@>$#>@$@$#%>@.26;9:79:79;/02.;9:;5;<78;<;5;.2@2-&@-<78&-<78@&@=@(*(*(@?#?#?$#$#$?#?<#?#?#?#?#?$#$'$?$#<#$?<?$?-,#$,-?@<?<?<?<?<?<?<?<?<?<?7878?<?78?<?<?<?@?@-?-?<?<?<?<?78787878787878-?<78<7878787878<?<7878787878787878787878<7878<78<?<?<?@?@?#@$@#$#$#$#$#$#$#$#$&#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$?#$#$(#$@;-;$@$@$@'@&;@('@'@'@'@'@'@'@'@'@(;9:9:;9:;9:;6;6;9:;9:78787878;&;6;6;7;?;@?@?@?@?@.;?&',7878787878?78787878678?,()6&?,&';?@'@(>&'6';&'@'@'@?-?'?@'?@-?-?-?-?-?'?'@'&'@?@'&;'&;'+'@#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$'(*;(;&#$#$#$#$#$#$#$#$#$#$#$#$#$#$&(',(;@>&>#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$&$#$#$#$#$#$#$#$&>#$#$'#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$#$@#$#$#$@#$'&$'('('(')()?(@-?=?@';@)')(@;+@(';';'(+'(;'()@;'@()'()()();@&+@;'(&'+'@'()()(@'('()@+@;'&'?')()'('('('('('@'&;')();'&)(@'@'@'@'@'@$>&$&>@$')()();)(@+@'@'@'@34'@'@$@$@'('<'@'@'@'@'@'>@'87@'@'@'=?@(;78;@(;657878787878787878;78;5;@;6787878;<6<@;=;@'@'@2@;=;78;<;6;+;<;#7;8>5>$7<8<78;78;'&'&'@'@'@'@'@=<>?=@?<?@2?@'@'@'@'@'@'@'@;@-@?,-?-?@?@?@?(@'@'@(-@'-@',',@'(@'@;'@';,@#$'@+@#@$@'@'@;@'@'@'@'@'@'@'@'@'@;-'?-'@-@'@'@-'-@;'@;@'@-'-@-'(@(@('@'@'@(@(-@;@'-;'-@'?'(@-;@'@;'@-'@-'@;@-@'@#@$@-'(@+@-@'@(6@'@'-'@'(-;@'-@'@)()'(;@-+@()')()(;2;@2@'@+@('()(@+;')'@'(;'@()')()';(;)(+';';@-@'@')()()(;(@'@'@'@'@';@'()(@+@()@'@'@'@'@'@'@(')()@)@)@'@)@')@(@(@')()()(';+;@;('@')()()()(';'@+@')(@)()(;'(@')()()(;'@+@;@'()()()('@+@'@()()(@+-;?@')()(;@#$+-@'@'@'@'@')@)@()(')')(;@+@'@')(@()(';')@'('()'(;(@'()('()(;';@'@'@')(@()(';@+-@;'@(@)()()(@'@'@'(@(@(@('(@+@'@'@')@(@)()('@+@'();@'@-?=?@;'@,@;@'@'@2@'@'@'@+@;@'@(;@'(;?&;?@+@-@'@'@#$-;@'@(')@(&@&;&(@)@'@'@'@'@'@'@'@'@'@'@'@?(;2@?@?@?)(?)2(?(?(?@?(?@-@?@-@#$#$@$#$#@#@#@#@#@#$@$@$@$#$#@#@#@#@$#@#@#@#@#@$#$#$#$#$#$#$@#<$<$#<$<$#<$<$#<$<$#<$<$#$@+?(?(?(?(?;@(@(@(@(@(@(@(@'@(&@+@'?@'(+@=@'@-(@#$(&@+@;@-?-=-@-?-@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@'@<@?@?@?@?@?@?@-?@?@?@?@?@?@?>?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@?@+@'@'@'@'@'@'@'@2@2@(@4@4@";

// build/fable_modules/fable-library-js.4.24.0/Char.js
function getCategoryFunc() {
  const offset = 35;
  const a1 = [...rangeDeltas].map((ch) => (ch.codePointAt(0) ?? 0) - offset);
  const a2 = [...categories].map((ch) => (ch.codePointAt(0) ?? 0) - offset);
  const codepoints = new Uint32Array(a1);
  const categories2 = new Uint8Array(a2);
  for (let i = 1; i < codepoints.length; ++i) {
    codepoints[i] += codepoints[i - 1];
  }
  return (cp) => {
    let hi = codepoints.length;
    let lo = 0;
    while (hi - lo > 1) {
      const mid = Math.floor((hi + lo) / 2);
      const test = codepoints[mid];
      if (cp < test) {
        hi = mid;
      } else if (cp === test) {
        hi = lo = mid;
        break;
      } else if (test < cp) {
        lo = mid;
      }
    }
    return categories2[lo];
  };
}
var isControlMask = 1 << 14;
var isDigitMask = 1 << 8;
var isLetterMask = 0 | 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3 | 1 << 4;
var isLetterOrDigitMask = isLetterMask | isDigitMask;
var isUpperMask = 1 << 0;
var isLowerMask = 1 << 1;
var isNumberMask = 0 | 1 << 8 | 1 << 9 | 1 << 10;
var isPunctuationMask = 0 | 1 << 18 | 1 << 19 | 1 << 20 | 1 << 21 | 1 << 22 | 1 << 23 | 1 << 24;
var isSeparatorMask = 0 | 1 << 11 | 1 << 12 | 1 << 13;
var isSymbolMask = 0 | 1 << 25 | 1 << 26 | 1 << 27 | 1 << 28;
var isWhiteSpaceMask = 0 | 1 << 11 | 1 << 12 | 1 << 13;
var unicodeCategoryFunc = getCategoryFunc();
function charCodeAt(s, index) {
  if (index >= 0 && index < s.length) {
    return s.charCodeAt(index);
  } else {
    throw new Error("Index out of range.");
  }
}
var isDigit = (s) => isDigit2(s, 0);
var isUpper = (s) => isUpper2(s, 0);
function getUnicodeCategory2(s, index) {
  const cp = charCodeAt(s, index);
  return unicodeCategoryFunc(cp);
}
function isDigit2(s, index) {
  const test = 1 << getUnicodeCategory2(s, index);
  return (test & isDigitMask) !== 0;
}
function isUpper2(s, index) {
  const test = 1 << getUnicodeCategory2(s, index);
  return (test & isUpperMask) !== 0;
}

// build/SettingTab.js
var obsidian = __toModule(require("obsidian"));
function System_String__String_camelcaseToHumanReadable_Static_Z721C83C5(str) {
  let source_1;
  return toString((source_1 = pairwise2(str.split("")), fold2((sb, tupledArg) => {
    const c2 = tupledArg[1];
    const up = isUpper;
    const matchValue = up(tupledArg[0]);
    const matchValue_1 = up(c2);
    let matchResult;
    if (isDigit(c2)) {
      matchResult = 0;
    } else if (matchValue) {
      matchResult = 2;
    } else if (matchValue_1) {
      matchResult = 1;
    } else {
      matchResult = 2;
    }
    switch (matchResult) {
      case 0:
        return StringBuilder__Append_Z721C83C5(sb, ` ${c2} `);
      case 1:
        return StringBuilder__Append_Z721C83C5(sb, ` ${c2.toLocaleLowerCase()}`);
      default:
        return StringBuilder__Append_244C7CD6(sb, c2);
    }
  }, StringBuilder_$ctor_Z721C83C5(`${str[0].toLocaleUpperCase()}`), source_1)));
}
function createSettingForProperty(plugin, settingTab, propName, propType) {
  const setting = new obsidian.Setting(settingTab.containerEl).setName(System_String__String_camelcaseToHumanReadable_Static_Z721C83C5(propName));
  if (equals2(propType, bool_type)) {
    setting.addToggle((toggle) => {
      let on;
      on = getValue(find((f) => name(f) === propName, getRecordElements(PluginSettings_$reflection())), plugin.settings), toggle.setValue(on);
      toggle.onChange((value_1) => {
        plugin.settings = Gen_PluginSettings_setFieldByName(propName, value_1, plugin.settings);
        return void 0;
      });
      return void 0;
    });
  } else if (equals2(propType, string_type)) {
    setting.addText((txt) => {
      let value_4;
      value_4 = getValue(find((f_1) => name(f_1) === propName, getRecordElements(PluginSettings_$reflection())), plugin.settings), txt.setValue(value_4);
      txt.onChange((value_6) => {
        plugin.settings = Gen_PluginSettings_setFieldByName(propName, value_6, plugin.settings);
        return void 0;
      });
      return void 0;
    });
  }
}
function createSettingDisplay(plugin, settingtab, unitVar) {
  const containerEl = settingtab.containerEl;
  containerEl.empty();
  containerEl.createEl("h2", ((Item) => Item)({
    text: "Quick snippets and navigation"
  }));
  const fields = getRecordElements(PluginSettings_$reflection());
  for (let idx = 0; idx <= fields.length - 1; idx++) {
    const field = item(idx, fields);
    createSettingForProperty(plugin, settingtab, name(field), field[1]);
  }
  return void 0;
}
function create(app, plugin) {
  const settingtab = new obsidian.PluginSettingTab(app, plugin);
  settingtab.display = () => createSettingDisplay(plugin, settingtab, void 0);
  settingtab.hide = (f) => {
    plugin.saveSettings(plugin.settings);
    return void 0;
  };
  return settingtab;
}

// build/Helpers.js
var obsidian2 = __toModule(require("obsidian"));
function Command_forMenu(id, name2, icon, callback) {
  return {
    id,
    name: name2,
    icon,
    callback
  };
}
function Command_forEditor(id, name2, icon, callback) {
  return {
    id,
    name: name2,
    icon,
    editorCallback: callback
  };
}
function ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(this$) {
  const values = this$.chooser.values;
  return item(this$.chooser.selectedItem, values);
}
var SuggestModal_SuggestModalKeyboardShortcut$1 = class extends Record {
  constructor(modifiers, key, action) {
    super();
    this.modifiers = modifiers;
    this.key = key;
    this.action = action;
  }
};
function SuggestModal_create(app) {
  return new obsidian2.SuggestModal(app);
}
function SuggestModal_withGetSuggestions(query, sm) {
  sm.getSuggestions = query;
  return sm;
}
function SuggestModal_withGetSuggestions2(query, sm) {
  sm.getSuggestions = (f) => {
    const collection = query(f);
    return Array.from(collection);
  };
  return sm;
}
function SuggestModal_withOnChooseSuggestion(fn, sm) {
  sm.onChooseSuggestion = (f, eventargs) => {
    fn([f, eventargs]);
  };
  return sm;
}
function SuggestModal_withRenderSuggestion(fn, sm) {
  sm.renderSuggestion = (sugg, elem) => {
    fn(sugg, elem);
    return void 0;
  };
  return sm;
}
function SuggestModal_withKeyboardShortcut(keyboardShortcut, sm) {
  sm.scope.register(Array.from(keyboardShortcut.modifiers), keyboardShortcut.key, (evt) => {
    keyboardShortcut.action([evt, sm]);
    return false;
  });
  return sm;
}
var Content_CodeBlockContent = class extends Record {
  constructor(startLine, endLine, content) {
    super();
    this.startLine = startLine | 0;
    this.endLine = endLine | 0;
    this.content = content;
  }
};
function Content_getCodeBlocks(app) {
  let option, objectArg_1;
  let view;
  const type = obsidian2.MarkdownView;
  const objectArg = app.workspace;
  view = objectArg.getActiveViewOfType(type);
  if (view == null) {
    return void 0;
  } else {
    const view_1 = value(view);
    const lines = split(view_1.getViewData(), ["\n"], void 0, 0);
    return map((optionalCodeblockSections) => toArray2(map4((f_1) => {
      const startLine = ~~f_1.position.start.line + 1 | 0;
      const endLine = ~~f_1.position.end.line - 1 | 0;
      return new Content_CodeBlockContent(startLine, endLine, join("\n", lines.slice(startLine, endLine + 1)));
    }, optionalCodeblockSections)), bind((f) => map((d) => where((d_1) => d_1.type === "code", d), f.sections), (option = app.workspace.getActiveFile(), bind((objectArg_1 = app.metadataCache, (file) => objectArg_1.getFileCache(file)), option))));
  }
}
function Content_getHeadings(app) {
  let option, objectArg_1;
  let view;
  const type = obsidian2.MarkdownView;
  const objectArg = app.workspace;
  view = objectArg.getActiveViewOfType(type);
  if (view == null) {
    return void 0;
  } else {
    const view_1 = value(view);
    const lines = split(view_1.getViewData(), ["\n"], void 0, 0);
    return map((headingCaches) => toArray2(map4((f_1) => {
      const startLine = ~~f_1.position.start.line + 1 | 0;
      const endLine = ~~f_1.position.end.line - 1 | 0;
      return new Content_CodeBlockContent(startLine, endLine, join("\n", where((f_2) => !f_2.startsWith("title:"), lines.slice(startLine, endLine + 1))));
    }, headingCaches)), bind((f) => map((d) => d.slice(), f.headings), (option = app.workspace.getActiveFile(), bind((objectArg_1 = app.metadataCache, (file) => objectArg_1.getFileCache(file)), option))));
  }
}
function Seq_skipSafe(num, source) {
  return delay(() => enumerateUsing(getEnumerator(source), (e) => {
    let idx = 0;
    let loop = true;
    return append(enumerateWhile(() => idx < num && loop, delay(() => append(!e["System.Collections.IEnumerator.MoveNext"]() ? (loop = false, empty2()) : empty2(), delay(() => {
      idx = idx + 1 | 0;
      return empty2();
    })))), delay(() => enumerateWhile(() => e["System.Collections.IEnumerator.MoveNext"](), delay(() => singleton2(e["System.Collections.Generic.IEnumerator`1.get_Current"]())))));
  }));
}
function ObsidianBindings_App__App_executeCommandById_Z721C83C5(this$, commandId) {
  return this$.commands.executeCommandById(commandId);
}
function ObsidianBindings_App__App_getTagsOfFile_Z585EFF42(this$, file) {
  const fileCacheOpt = this$.metadataCache.getFileCache(file);
  if (fileCacheOpt != null) {
    const cache = fileCacheOpt;
    return append(defaultArg(map((source) => map4((f) => f.tag, source), cache.tags), empty2()), map4((f_2) => `#${f_2}`, defaultArg(map((f_1) => {
      const tags = f_1["tags"];
      if (equals(tags, defaultOf())) {
        return empty2();
      } else {
        return tags;
      }
    }, cache.frontmatter), empty2())));
  } else {
    return empty2();
  }
}

// build/Commands.js
var obsidian3 = __toModule(require("obsidian"));

// build/fable_modules/fable-library-js.4.24.0/MapUtil.js
function tryGetValue(map5, key, defaultValue) {
  if (map5.has(key)) {
    defaultValue.contents = map5.get(key);
    return true;
  }
  return false;
}
function addToDict(dict, k, v) {
  if (dict.has(k)) {
    throw new Error("An item with the same key has already been added. Key: " + k);
  }
  dict.set(k, v);
}
function getItemFromDict(map5, key) {
  if (map5.has(key)) {
    return map5.get(key);
  } else {
    throw new Error(`The given key '${key}' was not present in the dictionary.`);
  }
}

// build/fable_modules/fable-library-js.4.24.0/MutableMap.js
var Dictionary = class {
  constructor(pairs, comparer) {
    const this$ = new FSharpRef(defaultOf());
    this.comparer = comparer;
    this$.contents = this;
    this.hashMap = new Map([]);
    this["init@9"] = 1;
    const enumerator = getEnumerator(pairs);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        const pair = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
        Dictionary__Add_5BDDA1(this$.contents, pair[0], pair[1]);
      }
    } finally {
      disposeSafe(enumerator);
    }
  }
  get [Symbol.toStringTag]() {
    return "Dictionary";
  }
  toJSON() {
    const this$ = this;
    return Array.from(this$);
  }
  "System.Collections.IEnumerable.GetEnumerator"() {
    const this$ = this;
    return getEnumerator(this$);
  }
  GetEnumerator() {
    const this$ = this;
    return getEnumerator(concat(this$.hashMap.values()));
  }
  [Symbol.iterator]() {
    return toIterator(getEnumerator(this));
  }
  "System.Collections.Generic.ICollection`1.Add2B595"(item2) {
    const this$ = this;
    Dictionary__Add_5BDDA1(this$, item2[0], item2[1]);
  }
  "System.Collections.Generic.ICollection`1.Clear"() {
    const this$ = this;
    Dictionary__Clear(this$);
  }
  "System.Collections.Generic.ICollection`1.Contains2B595"(item2) {
    const this$ = this;
    const matchValue = Dictionary__TryFind_2B595(this$, item2[0]);
    let matchResult, p_1;
    if (matchValue != null) {
      if (equals(value(matchValue)[1], item2[1])) {
        matchResult = 0;
        p_1 = value(matchValue);
      } else {
        matchResult = 1;
      }
    } else {
      matchResult = 1;
    }
    switch (matchResult) {
      case 0:
        return true;
      default:
        return false;
    }
  }
  "System.Collections.Generic.ICollection`1.CopyToZ3B4C077E"(array, arrayIndex) {
    const this$ = this;
    iterateIndexed((i, e) => {
      setItem(array, arrayIndex + i, e);
    }, this$);
  }
  "System.Collections.Generic.ICollection`1.get_Count"() {
    const this$ = this;
    return Dictionary__get_Count(this$) | 0;
  }
  "System.Collections.Generic.ICollection`1.get_IsReadOnly"() {
    return false;
  }
  "System.Collections.Generic.ICollection`1.Remove2B595"(item2) {
    const this$ = this;
    const matchValue = Dictionary__TryFind_2B595(this$, item2[0]);
    if (matchValue != null) {
      if (equals(value(matchValue)[1], item2[1])) {
        Dictionary__Remove_2B595(this$, item2[0]);
      }
      return true;
    } else {
      return false;
    }
  }
  "System.Collections.Generic.IDictionary`2.Add5BDDA1"(key, value2) {
    const this$ = this;
    Dictionary__Add_5BDDA1(this$, key, value2);
  }
  "System.Collections.Generic.IDictionary`2.ContainsKey2B595"(key) {
    const this$ = this;
    return Dictionary__ContainsKey_2B595(this$, key);
  }
  "System.Collections.Generic.IDictionary`2.get_Item2B595"(key) {
    const this$ = this;
    return Dictionary__get_Item_2B595(this$, key);
  }
  "System.Collections.Generic.IDictionary`2.set_Item5BDDA1"(key, v) {
    const this$ = this;
    Dictionary__set_Item_5BDDA1(this$, key, v);
  }
  "System.Collections.Generic.IDictionary`2.get_Keys"() {
    const this$ = this;
    return toArray2(delay(() => map4((pair) => pair[0], this$)));
  }
  "System.Collections.Generic.IDictionary`2.Remove2B595"(key) {
    const this$ = this;
    return Dictionary__Remove_2B595(this$, key);
  }
  "System.Collections.Generic.IDictionary`2.TryGetValue6DC89625"(key, value2) {
    const this$ = this;
    const matchValue = Dictionary__TryFind_2B595(this$, key);
    if (matchValue != null) {
      const pair = value(matchValue);
      value2.contents = pair[1];
      return true;
    } else {
      return false;
    }
  }
  "System.Collections.Generic.IDictionary`2.get_Values"() {
    const this$ = this;
    return toArray2(delay(() => map4((pair) => pair[1], this$)));
  }
  get size() {
    const this$ = this;
    return Dictionary__get_Count(this$) | 0;
  }
  clear() {
    const this$ = this;
    Dictionary__Clear(this$);
  }
  delete(k) {
    const this$ = this;
    return Dictionary__Remove_2B595(this$, k);
  }
  entries() {
    const this$ = this;
    return map4((p) => [p[0], p[1]], this$);
  }
  get(k) {
    const this$ = this;
    return Dictionary__get_Item_2B595(this$, k);
  }
  has(k) {
    const this$ = this;
    return Dictionary__ContainsKey_2B595(this$, k);
  }
  keys() {
    const this$ = this;
    return map4((p) => p[0], this$);
  }
  set(k, v) {
    const this$ = this;
    Dictionary__set_Item_5BDDA1(this$, k, v);
    return this$;
  }
  values() {
    const this$ = this;
    return map4((p) => p[1], this$);
  }
  forEach(f, thisArg) {
    const this$ = this;
    iterate((p) => {
      f(p[1], p[0], this$);
    }, this$);
  }
};
function Dictionary__TryFindIndex_2B595(this$, k) {
  const h = this$.comparer.GetHashCode(k) | 0;
  let matchValue;
  let outArg = defaultOf();
  matchValue = [tryGetValue(this$.hashMap, h, new FSharpRef(() => outArg, (v) => {
    outArg = v;
  })), outArg];
  if (matchValue[0]) {
    return [true, h, matchValue[1].findIndex((pair) => this$.comparer.Equals(k, pair[0]))];
  } else {
    return [false, h, -1];
  }
}
function Dictionary__TryFind_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let matchResult;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      matchResult = 0;
    } else {
      matchResult = 1;
    }
  } else {
    matchResult = 1;
  }
  switch (matchResult) {
    case 0:
      return getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]];
    default:
      return void 0;
  }
}
function Dictionary__Clear(this$) {
  this$.hashMap.clear();
}
function Dictionary__get_Count(this$) {
  let count = 0;
  let enumerator = getEnumerator(this$.hashMap.values());
  try {
    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
      const pairs = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
      count = count + pairs.length | 0;
    }
  } finally {
    disposeSafe(enumerator);
  }
  return count | 0;
}
function Dictionary__get_Item_2B595(this$, k) {
  const matchValue = Dictionary__TryFind_2B595(this$, k);
  if (matchValue != null) {
    return value(matchValue)[1];
  } else {
    throw new Error("The item was not found in collection");
  }
}
function Dictionary__set_Item_5BDDA1(this$, k, v) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]] = [k, v];
    } else {
      const value2 = void getItemFromDict(this$.hashMap, matchValue[1]).push([k, v]);
    }
  } else {
    this$.hashMap.set(matchValue[1], [[k, v]]);
  }
}
function Dictionary__Add_5BDDA1(this$, k, v) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      throw new Error(format("An item with the same key has already been added. Key: {0}", k));
    } else {
      const value2 = void getItemFromDict(this$.hashMap, matchValue[1]).push([k, v]);
    }
  } else {
    this$.hashMap.set(matchValue[1], [[k, v]]);
  }
}
function Dictionary__ContainsKey_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let matchResult;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      matchResult = 0;
    } else {
      matchResult = 1;
    }
  } else {
    matchResult = 1;
  }
  switch (matchResult) {
    case 0:
      return true;
    default:
      return false;
  }
}
function Dictionary__Remove_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let matchResult;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      matchResult = 0;
    } else {
      matchResult = 1;
    }
  } else {
    matchResult = 1;
  }
  switch (matchResult) {
    case 0: {
      getItemFromDict(this$.hashMap, matchValue[1]).splice(matchValue[2], 1);
      return true;
    }
    default:
      return false;
  }
}

// build/fable_modules/fable-library-js.4.24.0/Seq2.js
function groupBy(projection, xs, comparer) {
  return delay(() => {
    const dict = new Dictionary([], comparer);
    const keys = [];
    const enumerator = getEnumerator(xs);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        const x = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
        const key = projection(x);
        let matchValue;
        let outArg = defaultOf();
        matchValue = [tryGetValue(dict, key, new FSharpRef(() => outArg, (v) => {
          outArg = v;
        })), outArg];
        if (matchValue[0]) {
          void matchValue[1].push(x);
        } else {
          addToDict(dict, key, [x]);
          void keys.push(key);
        }
      }
    } finally {
      disposeSafe(enumerator);
    }
    return map4((key_1) => [key_1, getItemFromDict(dict, key_1)], keys);
  });
}

// build/Commands.js
function goToPrevHeading(plugin) {
  return Command_forEditor("goToPrevHeading", "Go to previous heading", "square-chevron-up", uncurry2((editor) => {
    let objectArg;
    const cursor = editor.getCursor();
    const matchValue = Content_getHeadings(plugin.app);
    if (matchValue != null) {
      const targetHeading = tryFind((v) => v.startLine < ~~cursor.line, reverse2(matchValue));
      if (targetHeading != null) {
        const heading = targetHeading;
        editor.setCursor(heading.startLine - 1);
      }
    } else {
      objectArg = obsidian3.Notice, new objectArg("no headings found");
    }
    return (arg00$0040) => void 0;
  }));
}
function goToNextHeading(plugin) {
  return Command_forEditor("goToNextHeading", "Go to next heading", "square-chevron-down", uncurry2((editor) => {
    let objectArg;
    const cursor = editor.getCursor();
    const matchValue = Content_getHeadings(plugin.app);
    if (matchValue != null) {
      const targetHeading = tryFind((v) => v.startLine > ~~cursor.line + 1, matchValue);
      if (targetHeading != null) {
        const heading = targetHeading;
        editor.setCursor(heading.startLine - 1);
      }
    } else {
      objectArg = obsidian3.Notice, new objectArg("no headings found");
    }
    return (arg00$0040) => void 0;
  }));
}
function selectCurrentBlock(plugin) {
  return Command_forEditor("selectCurrentBlock", "Select current heading block", "text-select", uncurry2((editor) => {
    let objectArg;
    const cursor = editor.getCursor();
    const matchValue = Content_getHeadings(plugin.app);
    if (matchValue != null) {
      const headings = matchValue;
      const matchValue_1 = tryFind((v) => v.startLine <= ~~cursor.line + 1, reverse2(headings));
      if (matchValue_1 == null) {
      } else {
        const topHeading = matchValue_1;
        const matchValue_2 = tryFind((v_1) => v_1.startLine > topHeading.startLine, headings);
        if (matchValue_2 == null) {
          editor.setSelection({
            ch: 0,
            line: topHeading.startLine - 1
          }, {
            ch: 0,
            line: editor.lastLine()
          });
        } else {
          const bottomHeading = matchValue_2;
          const endlineText = editor.getLine(bottomHeading.startLine - 2);
          editor.setSelection({
            ch: 0,
            line: topHeading.startLine - 1
          }, {
            ch: endlineText.length,
            line: bottomHeading.startLine - 2
          });
        }
      }
    } else {
      objectArg = obsidian3.Notice, new objectArg("no headings found");
    }
    return (arg00$0040) => void 0;
  }));
}
function goToPrevEmptyLine(plugin) {
  return Command_forEditor("goToPrevEmptyLine", "Go to previous empty line", "panel-top-close", uncurry2((editor) => {
    let x_1;
    const cursor = editor.getCursor();
    const linesbefore = reverse(split(editor.getValue(), ["\n"], void 0, 0).slice(void 0, ~~cursor.line + 1));
    let foundOpt;
    if (!(match(/^\s*$/gu, editor.getLine(~~cursor.line)) != null)) {
      foundOpt = tryFindIndex((f) => match(/^\s*$/gu, f) != null, Seq_skipSafe(1, linesbefore));
    } else {
      const nToSkip = defaultArg(map((y) => 1 + y, tryFindIndex((f_1) => !(match(/^\s*$/gu, f_1) != null), linesbefore)), 1) | 0;
      foundOpt = map((x_1 = nToSkip - 1 | 0, (y_1) => x_1 + y_1), tryFindIndex((f_2) => match(/^\s*$/gu, f_2) != null, Seq_skipSafe(nToSkip, linesbefore)));
    }
    if (foundOpt != null) {
      const moveby = foundOpt | 0;
      const newpos = ~~cursor.line - moveby - 1;
      editor.setCursor(newpos);
      return (arg00$0040_1) => void 0;
    } else {
      return (arg00$0040) => void 0;
    }
  }));
}
function goToNextEmptyLine(plugin) {
  return Command_forEditor("goToNextEmptyLine", "Go to next empty line", "panel-bottom-close", uncurry2((editor) => {
    let x_1;
    const cursor = editor.getCursor();
    const linesafter = split(editor.getValue(), ["\n"], void 0, 0).slice(~~cursor.line, split(editor.getValue(), ["\n"], void 0, 0).length);
    let foundOpt;
    if (!(match(/^\s*$/gu, editor.getLine(~~cursor.line)) != null)) {
      foundOpt = tryFindIndex((f) => match(/^\s*$/gu, f) != null, Seq_skipSafe(1, linesafter));
    } else {
      const nToSkip = defaultArg(map((y) => 1 + y, tryFindIndex((f_1) => !(match(/^\s*$/gu, f_1) != null), linesafter)), 1) | 0;
      foundOpt = map((x_1 = nToSkip - 1 | 0, (y_1) => x_1 + y_1), tryFindIndex((f_2) => match(/^\s*$/gu, f_2) != null, Seq_skipSafe(nToSkip, linesafter)));
    }
    if (foundOpt != null) {
      const moveby = foundOpt | 0;
      const newpos = ~~cursor.line + moveby + 1;
      editor.setCursor(newpos);
      return (arg00$0040_1) => void 0;
    } else {
      return (arg00$0040) => void 0;
    }
  }));
}
function copyNextCodeBlock(plugin) {
  return Command_forEditor("copyNextCodeBlock", "Copy Next Code Block", "book-check", uncurry2((edit) => {
    let message, objectArg, matchValue_1, v_1;
    const matchValue = Content_getCodeBlocks(plugin.app);
    if (matchValue != null) {
      const blocks = matchValue;
      const cursor = edit.getCursor();
      const _arg_1 = tryFind((f) => f.endLine + 1 >= ~~cursor.line, blocks);
      if (_arg_1 != null) {
        const v = _arg_1;
        message = `copied:
${substring(v.content, 0, min(v.content.length, 50))}`, objectArg = obsidian3.Notice, new objectArg(message);
        matchValue_1 = navigator.clipboard, matchValue_1 != null ? (v_1 = matchValue_1, v_1.writeText(v.content)) : PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
          return Promise.resolve();
        }));
      } else {
        new obsidian3.Notice("could not find a code block");
      }
      return (arg00$0040_1) => void 0;
    } else {
      return (arg00$0040) => void 0;
    }
  }));
}
function copyCodeBlock(plugin) {
  return Command_forMenu("copyCodeBlock", "Copy Code Block", "book-copy", () => {
    const codeblocks = Content_getCodeBlocks(plugin.app);
    if (codeblocks == null) {
      return void 0;
    } else {
      const codeblocks_1 = value(codeblocks);
      const modal = SuggestModal_withOnChooseSuggestion((tupledArg) => {
        let message, objectArg, matchValue, v;
        const f_3 = tupledArg[0];
        message = `copied:
${substring(f_3.content, 0, min(f_3.content.length, 50))}`, objectArg = obsidian3.Notice, new objectArg(message);
        matchValue = navigator.clipboard, matchValue != null ? (v = matchValue, v.writeText(f_3.content)) : PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
          return Promise.resolve();
        }));
      }, SuggestModal_withRenderSuggestion((f_2, elem) => {
        elem.innerText = f_2.content;
      }, SuggestModal_withGetSuggestions((queryInput) => {
        const query = obsidian3.prepareQuery(queryInput);
        const collection = map4((tuple) => tuple[0], where((f_1) => f_1[1] != null, map4((f) => [f, obsidian3.fuzzySearch(query, f.content)], codeblocks_1)));
        return Array.from(collection);
      }, SuggestModal_create(plugin.app))));
      modal.open();
      return void 0;
    }
  });
}
function tagSearch(plugin) {
  return Command_forMenu("tagSearch", "Search by Tag", "text-search", () => {
    const sm_3 = SuggestModal_withOnChooseSuggestion((tupledArg_2) => {
      let objectArg_2, objectArg_1;
      const cmd = plugin.settings.defaultModalCommand;
      const matchValue = plugin.app.commands.executeCommandById(cmd);
      if (matchValue) {
        const matchValue_1 = document.querySelector("input.prompt-input");
        if (equals(matchValue_1, defaultOf())) {
          objectArg_2 = obsidian3.Notice, new objectArg_2("plugin outdated");
        } else {
          const modalInput = matchValue_1;
          modalInput.value = `${tupledArg_2[0].tag} `;
          const ev = new Event("input", defaultOf());
          modalInput.dispatchEvent(ev);
        }
      } else {
        objectArg_1 = obsidian3.Notice, new objectArg_1(`failed to run command: ${cmd}, configure Default modal command in settings`);
      }
    }, SuggestModal_withRenderSuggestion((f_2, elem) => {
      elem.innerText = `${f_2.count}:	${f_2.tag}`;
    }, SuggestModal_withGetSuggestions((queryInput) => {
      let results, source, objectArg;
      const query = obsidian3.prepareQuery(queryInput);
      const collection = map4((tuple_1) => tuple_1[0], (results = choose((f) => map((search) => [f, search.score], obsidian3.fuzzySearch(query, f.tag)), map4((tupledArg_1) => ({
        count: tupledArg_1[1],
        tag: tupledArg_1[0]
      }), map4((tupledArg) => [tupledArg[0], length2(tupledArg[1])], groupBy((x) => x, (source = plugin.app.vault.getMarkdownFiles(), collect((objectArg = plugin.app, (file) => ObsidianBindings_App__App_getTagsOfFile_Z585EFF42(objectArg, file)), source)), {
        Equals: (x_1, y) => x_1 === y,
        GetHashCode: stringHash
      })))), queryInput === "" ? sortByDescending((f_1) => f_1[0].count, results, {
        Compare: comparePrimitives
      }) : sortByDescending((tuple) => tuple[1], results, {
        Compare: comparePrimitives
      })));
      return Array.from(collection);
    }, SuggestModal_create(plugin.app))));
    sm_3.open();
    return void 0;
  });
}
var FoldedTagSearchAction = class extends Union {
  constructor(tag, fields) {
    super();
    this.tag = tag;
    this.fields = fields;
  }
  cases() {
    return ["ExpandTag", "AddAnotherTag"];
  }
};
var FoldedTagSearchState = class extends Record {
  constructor(Level, Query, Filters, Actions) {
    super();
    this.Level = Level | 0;
    this.Query = Query;
    this.Filters = Filters;
    this.Actions = Actions;
  }
};
function FoldedTagSearchState_get_Default() {
  return new FoldedTagSearchState(1, "", empty(), empty());
}
function foldedTagSearch(plugin) {
  return Command_forMenu("foldedTagSearch", "Folded search by Tag", "search-slash", () => {
    const createModal = (state_1) => {
      let keyboardShortcut_3, sm_10, sm_4, sm_2, placeholder, instructions$0027, collection;
      const undoLastAction = (tupledArg_1) => {
        let n_3, str_4, matchValue_4, loop_1, bind$0040;
        const modal = tupledArg_1[1];
        const matchValue_2 = state_1.Actions;
        if (!isEmpty(matchValue_2)) {
          if (head(matchValue_2).tag === 0) {
            modal.close();
            const prevLevel = state_1.Level - 1 | 0;
            createModal(new FoldedTagSearchState(prevLevel, prevLevel === 1 ? "" : (n_3 = prevLevel - 1 | 0, str_4 = ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(modal).tag, matchValue_4 = (loop_1 = (pos_1_mut, n_1_3_mut) => {
              loop_1:
                while (true) {
                  const pos_1 = pos_1_mut, n_1_3 = n_1_3_mut;
                  const matchValue_5 = str_4.indexOf("/", pos_1) | 0;
                  if (matchValue_5 === -1) {
                    return -1;
                  } else if (n_1_3 > 1) {
                    pos_1_mut = matchValue_5 + 1;
                    n_1_3_mut = n_1_3 - 1;
                    continue loop_1;
                  } else {
                    return matchValue_5 | 0;
                  }
                  break;
                }
            }, loop_1(0, n_3)) | 0, matchValue_4 === -1 ? str_4 : substring(str_4, 0, matchValue_4 + 1)), state_1.Filters, tail(matchValue_2)));
          } else if (isEmpty(state_1.Filters)) {
          } else {
            modal.close();
            createModal((bind$0040 = FoldedTagSearchState_get_Default(), new FoldedTagSearchState(bind$0040.Level, bind$0040.Query, tail(state_1.Filters), skipWhile((f_4) => !equals(f_4, new FoldedTagSearchAction(1, [])), tail(matchValue_2)))));
          }
        }
      };
      const sm_13 = SuggestModal_withOnChooseSuggestion((tupledArg_6) => {
        let objectArg_2, objectArg_1;
        const cmd = plugin.settings.defaultModalCommand;
        const matchValue_7 = ObsidianBindings_App__App_executeCommandById_Z721C83C5(plugin.app, cmd);
        if (matchValue_7) {
          const matchValue_8 = document.querySelector("input.prompt-input");
          if (equals(matchValue_8, defaultOf())) {
            objectArg_2 = obsidian3.Notice, new objectArg_2("plugin outdated");
          } else {
            const modalInput = matchValue_8;
            const searchString = join(" ", cons(tupledArg_6[0].tag, state_1.Filters)) + " ";
            modalInput.value = searchString;
            const ev = new Event("input", defaultOf());
            modalInput.dispatchEvent(ev);
          }
        } else {
          objectArg_1 = obsidian3.Notice, new objectArg_1(`failed to run command: ${cmd}, configure Default modal command in settings`);
        }
      }, SuggestModal_withKeyboardShortcut(new SuggestModal_SuggestModalKeyboardShortcut$1([], "Tab", (tupledArg_5) => {
        const modal_2 = tupledArg_5[1];
        const currSelection_1 = ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(modal_2);
        const matchValue_6 = ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(modal_2).tag.endsWith("/");
        if (matchValue_6) {
          const newState = new FoldedTagSearchState(state_1.Level + 1, currSelection_1.tag, state_1.Filters, cons(new FoldedTagSearchAction(0, []), state_1.Actions));
          modal_2.close();
          createModal(newState);
        }
      }), (keyboardShortcut_3 = new SuggestModal_SuggestModalKeyboardShortcut$1([], "Enter", (tupledArg_4) => {
        let bind$0040_1;
        const modal_1 = tupledArg_4[1];
        const current = ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(modal_1).tag;
        if (exists((f_8) => f_8 === current, state_1.Filters)) {
        } else {
          modal_1.close();
          createModal((bind$0040_1 = FoldedTagSearchState_get_Default(), new FoldedTagSearchState(bind$0040_1.Level, bind$0040_1.Query, cons(ObsidianBindings_SuggestModal$1__SuggestModal$1_get_currentSelection(modal_1).tag, state_1.Filters), cons(new FoldedTagSearchAction(1, []), state_1.Actions))));
        }
      }), sm_10 = SuggestModal_withKeyboardShortcut(new SuggestModal_SuggestModalKeyboardShortcut$1(["Shift"], "Tab", undoLastAction), SuggestModal_withKeyboardShortcut(new SuggestModal_SuggestModalKeyboardShortcut$1(["Shift"], "Enter", undoLastAction), SuggestModal_withRenderSuggestion((f_7, elem) => {
        elem.innerText = `${f_7.count}:	${f_7.tag}`;
      }, SuggestModal_withGetSuggestions2((queryInput) => {
        let results, state, source_1, f1, objectArg;
        const query = obsidian3.prepareQuery(queryInput);
        return map4((tuple_1) => tuple_1[0], (results = choose((f_5) => map((search) => [f_5, search.score], obsidian3.fuzzySearch(query, f_5.tag)), map4((tupledArg_3) => ({
          count: tupledArg_3[1],
          tag: tupledArg_3[0]
        }), (state = state_1, map4((tupledArg) => [tupledArg[0], length2(tupledArg[1])], groupBy((f_3) => {
          const str_1 = f_3;
          let matchValue;
          const loop = (pos_mut, n_1_1_mut) => {
            loop:
              while (true) {
                const pos = pos_mut, n_1_1 = n_1_1_mut;
                const matchValue_1 = str_1.indexOf("/", pos) | 0;
                if (matchValue_1 === -1) {
                  return -1;
                } else if (n_1_1 > 1) {
                  pos_mut = matchValue_1 + 1;
                  n_1_1_mut = n_1_1 - 1;
                  continue loop;
                } else {
                  return matchValue_1 | 0;
                }
                break;
              }
          };
          matchValue = loop(0, state.Level);
          if (matchValue === -1) {
            return str_1;
          } else {
            return substring(str_1, 0, matchValue + 1);
          }
        }, collect((tags_1) => where((f_2) => f_2.startsWith(state.Query), tags_1), where((tags) => {
          if (forAll((filter2) => tags.some((f) => f.startsWith(filter2)), state.Filters)) {
            return tags.some((f_1) => f_1.startsWith(state.Query));
          } else {
            return false;
          }
        }, (source_1 = plugin.app.vault.getMarkdownFiles(), map4((f1 = (objectArg = plugin.app, (file) => ObsidianBindings_App__App_getTagsOfFile_Z585EFF42(objectArg, file)), (arg) => toArray2(f1(arg))), source_1)))), {
          Equals: (x, y) => x === y,
          GetHashCode: stringHash
        }))))), queryInput === "" ? sortByDescending((f_6) => f_6[0].count, results, {
          Compare: comparePrimitives
        }) : sortByDescending((tuple) => tuple[1], results, {
          Compare: comparePrimitives
        })));
      }, (sm_4 = (sm_2 = SuggestModal_create(plugin.app), placeholder = join(" AND ", cons(state_1.Query, state_1.Filters)), sm_2.setPlaceholder(placeholder), sm_2), instructions$0027 = (collection = map3((tupledArg_2) => ({
        command: tupledArg_2[0],
        purpose: tupledArg_2[1]
      }), ofArray([["Tab", "Expand tag"], ["Ctrl+Enter", "Add another tag"], ["Shift+Enter/Shift+Tab", "Undo last action"], ["Enter", "Search"]])), Array.from(collection)), sm_4.setInstructions(instructions$0027), sm_4))))), void sm_10.scope.register(["Mod"], keyboardShortcut_3.key, (evt_1) => {
        keyboardShortcut_3.action([evt_1, sm_10]);
        return false;
      }), void sm_10.scope.register(["Ctrl"], keyboardShortcut_3.key, (evt_1_1) => {
        keyboardShortcut_3.action([evt_1_1, sm_10]);
        return false;
      }), sm_10)));
      sm_13.open();
    };
    createModal(FoldedTagSearchState_get_Default());
    return void 0;
  });
}
function increaseHeading(plugin) {
  return Command_forEditor("increaseHeading", "Increase Heading level", "arrow-up-wide-narrow", uncurry2((edit) => {
    const lineIdx = edit.getCursor().line;
    const currLine = edit.getLine(lineIdx);
    const matchValue = currLine.startsWith("#");
    const matchValue_1 = currLine.startsWith("######");
    let matchResult;
    if (matchValue) {
      if (matchValue_1) {
        matchResult = 0;
      } else {
        matchResult = 1;
      }
    } else {
      matchResult = 0;
    }
    switch (matchResult) {
      case 0:
        return (arg00$0040) => void 0;
      default: {
        edit.setLine(lineIdx, `#${currLine}`);
        return (arg00$0040_1) => void 0;
      }
    }
  }));
}
function decreaseHeading(plugin) {
  return Command_forEditor("decreaseHeading", "Decrease Heading level", "arrow-down-narrow-wide", uncurry2((edit) => {
    const lineIdx = edit.getCursor().line;
    const currLine = edit.getLine(lineIdx);
    const matchValue = currLine.startsWith("##");
    if (matchValue) {
      edit.setLine(lineIdx, currLine.slice(1, currLine.length));
      return (arg00$0040_1) => void 0;
    } else {
      return (arg00$0040) => void 0;
    }
  }));
}
function insertDefaultCallout(plugin) {
  return Command_forEditor("insertDefaultCallout", "Insert Default Callout", "square-square", uncurry2((edit) => {
    edit.replaceSelection(`> [!${plugin.settings.defaultCalloutType}] `);
    return (arg00$0040) => void 0;
  }));
}
function insertCodeBlock(plugin) {
  return Command_forEditor("insertCodeBlock", "Insert Code Block", "toy-brick", uncurry2((edit) => {
    const newBlock = plugin.settings.use3BackticksForCodeBlock ? `\`\`\`${plugin.settings.defaultCodeBlockLanguage}

\`\`\`` : `\`\`\`\`${plugin.settings.defaultCodeBlockLanguage}

\`\`\`\``;
    edit.replaceSelection(newBlock);
    const cursor = edit.getCursor();
    edit.setCursor(cursor.line - 1);
    return (arg00$0040) => void 0;
  }));
}

// build/Main.js
var Plugin2 = class extends import_obsidian.Plugin {
  constructor(app, manifest) {
    super(app, manifest);
    const instance = new FSharpRef(defaultOf());
    this.app = app;
    instance.contents = this;
    this.plugin = instance.contents;
    Plugin2__init(this);
    this["init@14"] = 1;
    this.plugin.onload = () => {
      Plugin2__onload(this);
    };
  }
};
function Plugin2_$reflection() {
  return class_type("Main.Plugin2", void 0, Plugin2, class_type("Main.BasePlugin", void 0, import_obsidian.Plugin));
}
function Plugin2_$ctor_Z7F5F6E8A(app, manifest) {
  return new Plugin2(app, manifest);
}
function Plugin2__init(this$) {
  this$.plugin.loadSettings = (_arg) => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => this$.plugin.loadData().then((_arg_1) => {
    const data = _arg_1;
    if (data != null) {
      const v = value(data);
      return PromiseBuilder__Delay_62FBFDE1(promise, () => {
        this$.plugin.settings = v;
        return Promise.resolve();
      }).catch((_arg_2) => {
        this$.plugin.settings = PluginSettings_get_Default();
        return Promise.resolve();
      });
    } else {
      this$.plugin.settings = PluginSettings_get_Default();
      return Promise.resolve();
    }
  })));
  this$.plugin.saveSettings = (settings) => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
    this$.plugin.settings = settings;
    return this$.plugin.saveData(some(settings)).then(() => Promise.resolve(void 0));
  }));
}
function Plugin2__commandById_Z721C83C5(this$, id) {
  return this$.plugin.app.commands.executeCommandById(id);
}
function Plugin2__onload(this$) {
  toConsole(printf("loaded:"));
  this$.plugin.settings = this$.plugin.loadSettings();
  const settingsTab = create(this$.app, this$.plugin);
  this$.plugin.addSettingTab(settingsTab);
  const tagSearch2 = this$.plugin.addCommand(tagSearch(this$.plugin));
  const copyCodeBlock2 = this$.plugin.addCommand(copyCodeBlock(this$.plugin));
  const copyNextCodeBlock2 = this$.plugin.addCommand(copyNextCodeBlock(this$.plugin));
  const goToPrevEmptyLine2 = this$.plugin.addCommand(goToPrevEmptyLine(this$.plugin));
  const goToNextEmptyLine2 = this$.plugin.addCommand(goToNextEmptyLine(this$.plugin));
  const goToPrevHeading2 = this$.plugin.addCommand(goToPrevHeading(this$.plugin));
  const goToNextHeading2 = this$.plugin.addCommand(goToNextHeading(this$.plugin));
  const increaseHeading2 = this$.plugin.addCommand(increaseHeading(this$.plugin));
  const decreaseHeading2 = this$.plugin.addCommand(decreaseHeading(this$.plugin));
  const insertDefaultCallout2 = this$.plugin.addCommand(insertDefaultCallout(this$.plugin));
  const insertCodeBlock2 = this$.plugin.addCommand(insertCodeBlock(this$.plugin));
  const selectCurrentBlock2 = this$.plugin.addCommand(selectCurrentBlock(this$.plugin));
  const foldedTagSearch2 = this$.plugin.addCommand(foldedTagSearch(this$.plugin));
  this$.plugin.addRibbonIcon("layers-2", "Quick snippets and navigation: Search tags", (v) => {
    console.log(some(settingsTab));
    this$.plugin.app.commands.executeCommandById(tagSearch2.id);
    return void 0;
  });
}
module.exports = Plugin2;

/* nosourcemap */