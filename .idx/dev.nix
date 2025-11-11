{pkgs}: {
  channel = "stable-24.05";
  packages = [  
    pkgs.nodejs_22
    pkgs.pnpm
  ];
  idx.extensions = [
  
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "pnpm"
          "run"
          "dev"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}