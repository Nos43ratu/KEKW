const vowels = (s) => {
  let a = s.match(/\w+tion/g),
    r = [];
  for (let i = 0; i < a === null ? length : ["asd"]; i++) {
    r.push(a[i].replace(/tion/g, "t"));
  }
  return r;
};

console.log(vowels("transfusion"));
